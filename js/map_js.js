/**
 * by tom_o_t - aka Thomas Turnbull for Green Map System
 * Inspired by Bevan Rudge @ CivicActions for The Witness Hub
 */

// Add stuff to the map.
// This is based on other drupal gmap.module javascripts.
Drupal.gmap.addHandler('gmap', function(elem) {
  var obj = this;
  obj.bind('init', function() {
    obj.map.addControl(new TextualZoomControl());
  });
});







/**
 * FullScreenControl is a GControl that provides a button to change between full-screen and regular modes.
 * Based on http://code.google.com/apis/maps/documentation/controls.html#Custom_Controls and
 * http://code.google.com/apis/maps/documentation/examples/control-custom.html
 */
function TextualZoomControl() {}

// To "subclass" the GControl, we set the prototype object to an instance of the GControl object.
TextualZoomControl.prototype = new GControl();

// Creates a one DIV for each of the buttons and places them in a container
// DIV which is returned as our control element. We add the control to
// to the map container and return the element for the map class to
// position properly.
TextualZoomControl.prototype.initialize = function(map) {
  var container = document.createElement("div");

  var zoomInDiv = document.createElement("div");
  this.setButtonStyle_(zoomInDiv);
  container.appendChild(zoomInDiv);
  zoomInDiv.appendChild(document.createTextNode("Zoom In"));
  GEvent.addDomListener(zoomInDiv, "click", function() {
    map.zoomIn();
  });

  var zoomOutDiv = document.createElement("div");
  this.setButtonStyle_(zoomOutDiv);
  container.appendChild(zoomOutDiv);
  zoomOutDiv.appendChild(document.createTextNode("Zoom Out"));
  GEvent.addDomListener(zoomOutDiv, "click", function() {
    map.zoomOut();
  });

  map.getContainer().appendChild(container);
  return container;
}

// By default, the control will appear in the top right corner of the
// map with 270 and 27 pixels of padding.
TextualZoomControl.prototype.getDefaultPosition = function() {
  return new GControlPosition(G_ANCHOR_TOP_RIGHT, new GSize(270, 27));
}

// Sets the proper CSS for the given button element.
TextualZoomControl.prototype.setButtonStyle_ = function(button) {
  button.style.textDecoration = "underline";
  button.style.color = "#0000cc";
  button.style.backgroundColor = "white";
  button.style.font = "small Arial";
  button.style.border = "1px solid black";
  button.style.padding = "2px";
  button.style.marginBottom = "3px";
  button.style.textAlign = "center";
  button.style.width = "6em";
  button.style.cursor = "pointer";
}
