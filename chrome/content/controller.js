var AboutAddons =
{
 _timer: Components.classes['@mozilla.org/timer;1'].createInstance(Components.interfaces.nsITimer),
 init: function()
 {
  document.addEventListener('ViewChanged', AboutAddons.showButton, true);
  AboutAddons.showButton();
 },
 _createButton: function()
 {
  var button = document.createElement('aboutAddonsAboutButton');
  return button;
 },
 showButton: function()
 {
  var existings;
  var cb;
  var viewBox = null;
  if (document.getElementById('headered-views-content') !== null)
   viewBox = document.getElementById('headered-views-content');
  else if (document.getElementById('view-port') !== null)
   viewBox = document.getElementById('view-port');
  if (viewBox === null)
   return;
  if (viewBox.selectedPanel.id === 'list-view')
  {
   for (var i = 0; i < document.getElementById('addon-list').itemCount; i++)
   {
    var item = document.getElementById('addon-list').getItemAtIndex(i);
    var controlContainer = document.getAnonymousElementByAttribute(item, 'anonid', 'control-container');
    if (controlContainer === null)
     continue;
    existings = controlContainer.getElementsByTagName('aboutAddonsAboutButton');
    if (existings.length)
    {
     cb = existings[0];
    }
    else
    {
     cb = AboutAddons._createButton();
     controlContainer.insertBefore(cb, controlContainer.firstChild);
    }
   }
   document.getElementById('addon-list').addEventListener('select', AboutAddons.newButton, false);
  }
  else if (viewBox.selectedPanel.id === 'detail-view')
  {
   existings = document.getElementById('detail-view').getElementsByTagName('aboutAddonsAboutButton');
   if (existings.length)
   {
    cb = existings[0];
   }
   else if (document.getElementById('detail-uninstall'))
   {
    cb = AboutAddons._createButton();
    document.getElementById('detail-uninstall').parentNode.insertBefore(cb, document.getElementById('detail-uninstall'));
   }
   else if (document.getElementById('detail-enable-btn'))
   {
    cb = AboutAddons._createButton();
    document.getElementById('detail-enable-btn').parentNode.insertBefore(cb, document.getElementById('detail-enable-btn'));
   }
  }
 },
 newButton: function()
 {
  var viewBox = null;
  if (document.getElementById('headered-views-content') !== null)
   viewBox = document.getElementById('headered-views-content');
  else if (document.getElementById('view-port') !== null)
   viewBox = document.getElementById('view-port');
  if (viewBox === null)
   return;
  if (viewBox.selectedPanel.id === 'list-view')
  {
   for (var i = 0; i < document.getElementById('addon-list').itemCount; i++)
   {
    var item = document.getElementById('addon-list').getItemAtIndex(i);
    var controlContainer = document.getAnonymousElementByAttribute(item, 'anonid', 'control-container');
    if (controlContainer === null)
     continue;
    var existings = controlContainer.getElementsByTagName('aboutAddonsAboutButton');
    var cb;
    if (existings.length)
    {
     cb = existings[0];
    }
    else
    {
     cb = AboutAddons._createButton();
     controlContainer.insertBefore(cb, controlContainer.firstChild);
    }
   }
  }
 }
};
addEventListener('load', AboutAddons.init, false);
