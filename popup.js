document.addEventListener('DOMContentLoaded', function () {
    let statusButton = document.getElementById('trigger');
    chrome.storage.sync.get(['status'], function (result) {
        statusButton.checked = result.status;
    });
    statusButton.addEventListener('click', function () {
        if (statusButton.checked) {
            chrome.storage.sync.set({'status': true});
        } else {
            chrome.storage.sync.set({'status': false});
        }
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
    }, false);
}, false);