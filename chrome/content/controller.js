var AboutAddons =
{
 timer: Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer),
 init: function()
 {
  if (AboutAddons.isLegacyEM())
  {
   AboutAddons.showLegacyButton();
   document.getElementById("extensionsView").addEventListener("select", AboutAddons.wait, false);
  }
  else
  {
   document.addEventListener("ViewChanged", AboutAddons.showButton, true);
   AboutAddons.showButton();
  }
 },
 wait: function()
 {
  AboutAddons.showLegacyButton();
  AboutAddons.timer.initWithCallback(AboutAddons.event, 1, Components.interfaces.nsITimer.TYPE_REPEATING_SLACK);
 },
 event:
 {
  notify: function(timer)
  {
   AboutAddons.showLegacyButton();
  }
 },
 createButton: function()
 {
  var button = document.createElement("aboutAddonsAboutButton");
  return button;
 },
 createLegacyButton: function()
 {
  var button = document.createElement("aboutAddonsLegacyAboutButton");
  return button;
 },
 isLegacyEM: function()
 {
  // Firefox 3.6 and below
  return document.getElementById("extensionsView");
 },
 showButton: function()
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
     cb = AboutAddons.createButton();
     controlContainer.insertBefore(cb, controlContainer.firstChild);
    }
   }
   document.getElementById("addon-list").addEventListener('select', AboutAddons.newButton, false);
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
    cb = AboutAddons.createButton();
    document.getElementById("detail-uninstall").parentNode.insertBefore(cb, document.getElementById("detail-uninstall"));
   }
   else if (document.getElementById("detail-enable-btn"))
   {
    cb = AboutAddons.createButton();
    document.getElementById("detail-enable-btn").parentNode.insertBefore(cb, document.getElementById("detail-enable-btn"));
   }
  }
 },
 newButton: function()
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
     cb = AboutAddons.createButton();
     controlContainer.insertBefore(cb, controlContainer.firstChild);
    }
   }
  }
 },
 showLegacyButton: function()
 {
  if(document.getElementById("aboutButtonOn"))
  {
   AboutAddons.timer.cancel();
   return;
  }
  if (AboutAddons.aboutButton && AboutAddons.aboutButton.parentNode)
  {
   AboutAddons.aboutButton.parentNode.removeChild(AboutAddons.aboutButton);
  }
  var elemExtension = document.getElementById("extensionsView").selectedItem;
  if (!elemExtension)
   return;
  var elemSelectedButtons = document.getAnonymousElementByAttribute(elemExtension, "anonid", "selectedButtons");
  if (!elemSelectedButtons)
   return;
  if (!AboutAddons.aboutButton)
   AboutAddons.aboutButton = AboutAddons.createLegacyButton();
  for (var i=0; i<elemSelectedButtons.childNodes.length; i++)
  {
   if (elemSelectedButtons.childNodes[i] && elemSelectedButtons.childNodes[i].nodeType == Node.ELEMENT_NODE
       && elemSelectedButtons.childNodes[i].getAttribute("class").match(/optionsButton/))
   {
    AboutAddons.aboutButton.id="aboutButtonOn";
    elemSelectedButtons.insertBefore(AboutAddons.aboutButton, elemSelectedButtons.childNodes[i]);
    break;
   }
  }
 }
};
addEventListener("load", AboutAddons.init, false);
