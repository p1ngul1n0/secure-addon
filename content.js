var current_url = window.location.toString() //Get current URL of window
var current_title = document.title //Get page title

chrome.storage.local.set({ current_url: current_url });
chrome.storage.local.set({ current_title: current_title });