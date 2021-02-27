var AboutAddons =
{
 _timer: Components.classes['@mozilla.org/timer;1'].createInstance(Components.interfaces.nsITimer),
 init: function()
 {
  if (AboutAddons._isLegacyEM())
  {
   AboutAddons._showLegacyButton();
   document.getElementById('extensionsView').addEventListener('select', AboutAddons.wait, false);
  }
  else
  {
   document.addEventListener('ViewChanged', AboutAddons.showButton, true);
   AboutAddons.showButton();
  }
 },
 wait: function()
 {
  AboutAddons._showLegacyButton();
  AboutAddons._timer.initWithCallback(AboutAddons.event, 1, Components.interfaces.nsITimer.TYPE_REPEATING_SLACK);
 },
 event:
 {
  notify: function(_timer)
  {
   AboutAddons._showLegacyButton();
  }
 },
 _createButton: function()
 {
  var button = document.createElement('aboutAddonsAboutButton');
  return button;
 },
 createLegacyButton: function()
 {
  var button = document.createElement('aboutAddonsLegacyAboutButton');
  return button;
 },
 _isLegacyEM: function()
 {
  // Firefox 3.6 and below
  return document.getElementById('extensionsView');
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
 },
 _showLegacyButton: function()
 {
  if(document.getElementById('aboutButtonOn'))
  {
   AboutAddons._timer.cancel();
   return;
  }
  if (AboutAddons.aboutButton && AboutAddons.aboutButton.parentNode)
  {
   AboutAddons.aboutButton.parentNode.removeChild(AboutAddons.aboutButton);
  }
  var elemExtension = document.getElementById('extensionsView').selectedItem;
  if (!elemExtension)
   return;
  var elemSelectedButtons = document.getAnonymousElementByAttribute(elemExtension, 'anonid', 'selectedButtons');
  if (!elemSelectedButtons)
   return;
  if (!AboutAddons.aboutButton)
   AboutAddons.aboutButton = AboutAddons.createLegacyButton();
  for (var i = 0; i < elemSelectedButtons.childNodes.length; i++)
  {
   if (elemSelectedButtons.childNodes[i] && elemSelectedButtons.childNodes[i].nodeType === Node.ELEMENT_NODE && elemSelectedButtons.childNodes[i].getAttribute('class').match(/optionsButton/))
   {
    AboutAddons.aboutButton.id='aboutButtonOn';
    elemSelectedButtons.insertBefore(AboutAddons.aboutButton, elemSelectedButtons.childNodes[i]);
    break;
   }
  }
 }
};
addEventListener('load', AboutAddons.init, false);
