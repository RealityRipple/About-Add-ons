if (!com) var com = {};
if (!com.RealityRipple) com.RealityRipple = {};

com.RealityRipple.AboutAddons = function()
{
 var pub  = {};
 var priv = {};

 pub.extView = document.getElementById("extensionsView")

 priv.timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);

 pub.wait = function()
 {
  priv.show();
  priv.timer.initWithCallback(com.RealityRipple.AboutAddons.event, 1, Components.interfaces.nsITimer.TYPE_REPEATING_SLACK);
 }

 pub.event = 
 {
  notify: function(timer)
  {
   priv.show();
  }
 }

 priv.show = function()
 {
  try
  {
   if(document.getElementById("aboutButtonOn"))
   {
    priv.timer.cancel();
    return;
   }
   var children;
   var child;
   children = com.RealityRipple.AboutAddons.extView.childNodes;
   var i;
   for (i = 0; i < children.length; i++)
   {
    child = children[i];
    if (child.getAttribute("selected") == "true")
     var selExt = child;
   }
   if(!selExt)
    return;
   children = document.getElementById("viewGroup").childNodes;
   for (i = 0; i < children.length; i++)
   {
    child = children[i];
    if (child.getAttribute("selected") == "true")
     var selView =child.id;
   }
   if(selView == 'search-view' || selView == 'plugins-view' || selView == 'updates-view' || selView == 'installs-view')
    return;
   var aboutButton = document.getElementById("aboutButton");
   var selectedButtonsBox;
   selectedButtonsBox = document.getAnonymousElementByAttribute(selExt, "anonid", "selectedButtons");
   if(!selectedButtonsBox)
   {
    selectedButtonsBox = document.getAnonymousElementByAttribute(selExt, "class", "selectedButtons");
    if(!selectedButtonsBox)
     return;
   }
   var aboutButtonClone = aboutButton.cloneNode(true);
   aboutButtonClone.hidden = false;
   aboutButtonClone.id = "aboutButtonOn";
   selectedButtonsBox.insertBefore(aboutButtonClone, selectedButtonsBox.firstChild);
  }
  catch (e)
  {
   priv.timer.cancel();
   return;
  }
 }
 return pub;
}();

com.RealityRipple.AboutAddons.extView.addEventListener("select", com.RealityRipple.AboutAddons.wait, false);