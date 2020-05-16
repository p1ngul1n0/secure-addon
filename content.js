//chrome.storage.local.clear(null);
for (var i = 1; i < localStorage.length; i++)   {
	var key = localStorage.key(i);
	var data = localStorage.getItem(key);
    chrome.storage.sync.set({ key : data});
    console.log(key+' : '+data)
}