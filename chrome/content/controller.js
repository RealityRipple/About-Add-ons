/* This code is in the public domain. No ownership is implied. */
if (!com) var com = {};
if (!com.RealityRipple) com.RealityRipple = {};
com.RealityRipple.AboutAddons = function()
{
 var pub = {};
 var priv = {};

 pub.init = function()
 {
  if (priv.isLegacyEM())
  {
   priv.showLegacyButton();
   document.getElementById("extensionsView").addEventListener("select", com.RealityRipple.AboutAddons.wait, false);
  }
  else
  {
   document.addEventListener("ViewChanged", com.RealityRipple.AboutAddons.showButton, true);
   com.RealityRipple.AboutAddons.showButton();
  }
 }

 priv.timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);

 pub.wait = function()
 {
  priv.showLegacyButton();
  priv.timer.initWithCallback(com.RealityRipple.AboutAddons.event, 1, Components.interfaces.nsITimer.TYPE_REPEATING_SLACK);
 }

 pub.event = 
 {
  notify: function(timer)
  {
   priv.showLegacyButton();
  }
 }

 priv.createButton = function()
 {
  var button = document.createElement("aboutAddonsAboutButton");
  return button;
 }

 priv.createLegacyButton = function()
 {
  var button = document.createElement("aboutAddonsLegacyAboutButton");
  return button;
 }

 priv.isLegacyEM  = function()
 {
  // Firefox 3.6 and below
  return document.getElementById("extensionsView");
 }

 pub.showButton = function()
 {
  var stuffer = function()
  {
   if (document.getElementById("view-port").selectedPanel.id == "list-view")
   {
    for (var i=0; i<document.getElementById("addon-list").itemCount; i++)
    {
     var item = document.getElementById("addon-list").getItemAtIndex(i);
     var controlContainer = document.getAnonymousElementByAttribute(item, 'anonid', 'control-container');
     var existings = controlContainer.getElementsByTagName("aboutAddonsAboutButton");
     var cb;
     if (existings.length)
     {
      cb = existings[0];
     }
     else
     {
      cb = priv.createButton();
      controlContainer.insertBefore(cb, controlContainer.firstChild);
     }
    }
   }
   else if (document.getElementById("view-port").selectedPanel.id == "detail-view")
   {
    var existings = document.getElementById("detail-view").getElementsByTagName("aboutAddonsAboutButton");
    var cb;
    if (existings.length)
    {
     cb = existings[0];
    }
    else if (document.getElementById("detail-uninstall"))
    {
     cb = priv.createButton();
     document.getElementById("detail-uninstall").parentNode.insertBefore(cb, document.getElementById("detail-uninstall"));
    }
    else if (document.getElementById("detail-enable-btn"))
    {
     cb = priv.createButton();
     document.getElementById("detail-enable-btn").parentNode.insertBefore(cb, document.getElementById("detail-enable-btn"));
    }
   }
  }
  stuffer();
 }

 priv.showLegacyButton = function()
 {
  if(document.getElementById("aboutButtonOn"))
  {
   priv.timer.cancel();
   return;
  }
  if (priv.aboutButton && priv.aboutButton.parentNode)
  {
   priv.aboutButton.parentNode.removeChild(priv.aboutButton);
  }
  var elemExtension = document.getElementById("extensionsView").selectedItem;
  if (!elemExtension)
   return;
  var elemSelectedButtons = document.getAnonymousElementByAttribute(elemExtension, "anonid", "selectedButtons");
  if (!elemSelectedButtons)
   return;
  if (!priv.aboutButton)
   priv.aboutButton = priv.createLegacyButton();
  for (var i=0; i<elemSelectedButtons.childNodes.length; i++)
  {
   if (elemSelectedButtons.childNodes[i] && elemSelectedButtons.childNodes[i].nodeType == Node.ELEMENT_NODE
       && elemSelectedButtons.childNodes[i].getAttribute("class").match(/optionsButton/))
   {
    priv.aboutButton.id="aboutButtonOn";
    elemSelectedButtons.insertBefore(priv.aboutButton, elemSelectedButtons.childNodes[i]);
    break;
   }
  }
 }

 return pub;
}();

addEventListener("load", com.RealityRipple.AboutAddons.init, false);