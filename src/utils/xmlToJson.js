export function xmlToJson(xmlFile) {
  // get the xml data and parse it
  let xml = new DOMParser().parseFromString(xmlFile.data, "application/xml");

  let points = [...xml.getElementsByTagName("Point")];

  // Create an Array to get all the childNodes:

  let places = [];

  // Push the values with keys using a loop:

  for (let i = 0; i < points.length; i++) {
    places.push({
      id: parseInt(points[i].childNodes[0].innerHTML),
      name: points[i].childNodes[1].innerHTML,
      type: points[i].childNodes[2].innerHTML,
      x: parseInt(points[i].childNodes[3].innerHTML),
      y: parseInt(points[i].childNodes[4].innerHTML)
    });
  }

  let modified = places.map(place => ({
    id: place.id,
    name: place.name,
    type:
      place.type === "STOP_AREA"
        ? "Station"
        : place.type === "ADDRESS"
        ? "Address"
        : "Place",
    x: place.x,
    y: place.y
  }));

  return modified;
}

export function nearestToJson(xmlFile) {
  // get the xml data and parse it
  let xml = new DOMParser().parseFromString(xmlFile.data, "application/xml");

  let points = [...xml.getElementsByTagName("NearestStopArea")];
  let nearestStop = {
    id: points[0].childNodes[0].innerHTML,
    name: points[0].childNodes[1].innerHTML,
    distance: points[0].childNodes[4].innerHTML + " meters"
  };

  console.log("get the signal, catched the needed stuff", nearestStop);

  return nearestStop;
}

export function listDepartures(xmlFile) {
  // get the xml data and parse it
  let xml = new DOMParser().parseFromString(xmlFile.data, "application/xml");

  let departs = [...xml.getElementsByTagName("Line")];
  let departLines = [];

  console.log(departs[4].childNodes);

  for (let i = 0; i < departs.length; i++) {
    departLines.push({
      name: departs[i].childNodes[0].innerHTML,
      no: departs[i].childNodes[1].innerHTML,
      date: departs[i].childNodes[2].innerHTML,
      stopPoint: departs[i].childNodes[4].innerHTML,
      lineType: departs[i].childNodes[6].innerHTML,
      towards: departs[i].childNodes[7].innerHTML
    });
  }

  let modified = departLines.map(departs => ({
    name: departs.name,
    no: departs.no,
    date: handleTimeFormat(departs.date),
    stopPoint: departs.stopPoint,
    lineType: departs.lineType,
    towards: departs.towards,
    vehicleIcon:
      departs.lineType === "Öresundståg"
        ? "tagGra.svg"
        : departs.lineType === "Pågatågen"
        ? "tagLila.svg"
        : departs.lineType === "Regionbuss"
        ? "bussGul.svg"
        : "bussGron.svg"
  }));

  console.log("return filtered stuff", modified);
  return modified;
}

function handleTimeFormat(val) {
  let pickedTime = new Date(val);
  let timezoneOffset = pickedTime.getTimezoneOffset() * 60000;
  let correctTime = new Date(pickedTime.getTime() - timezoneOffset);
  let time = JSON.stringify(correctTime);
  time = time.slice(12, 17);
  return time;
}
