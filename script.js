//function ro create dom elements
function createEle(tagName,attributeName1,attributeValue1,attributeName2,attributeValue2,attributeName3,attributeValue3,content){
    var element = document.createElement(tagName);
    if(attributeName1 && attributeValue1){
        element.setAttribute(attributeName1,attributeValue1);
    }
    if(attributeName2 && attributeValue2){
        element.setAttribute(attributeName2,attributeValue2);
    } 
    if(attributeName3 && attributeValue3){
        element.setAttribute(attributeName3,attributeValue3);
    }
    element.innerHTML=content;
    return element;
}

// Code for showing channel info from channel id:

var containerMain = createEle("div","class","container-fluid","id","containerMain","","","");
var channelInfoBox = createEle("div","class","channelInfoBox","","","","","");
var label1 = createEle("label","for","channelId1","","","","","Enter Channel ID");
var input1 = createEle("input","type","text","id","channelId1","required",true,"");
input1.setAttribute("placeholder","UCipVQOsmaDQ-vDHYoPiP38A ...... (for channel info)");
var channelInfoButton = createEle("button","class","btn button","","","","","Get Channel Info");
var channelHeading = createEle("h2","class","heading","","","","","");
var channelInfoContent = createEle("div","class","channelInfoContent d-flex align-items-center","","","","","");
var thumbnail = createEle("img","","","","","","","");
var details = createEle("div","id","details","class","d-flex flex-column","","","");
var title = createEle("div","id","title","","","","","");
var parameter1 = createEle("span","class","para","","","","","");
var parameter1Value = createEle("span","id","para1Value","","","","","");
title.append(parameter1,parameter1Value);
var description = createEle("div","id","description","","","","","");
var parameter2 = createEle("span","class","para","","","","","");
var parameter2Value = createEle("span","id","para2Value","","","","","");
description.append(parameter2,parameter2Value);
var publishedAt = createEle("div","id","publishedAt","","","","","");
var parameter3 = createEle("span","class","para","","","","","");
var parameter3Value = createEle("span","id","para3Value","","","","","");
publishedAt.append(parameter3,parameter3Value);
var country = createEle("div","id","country","","","","","");
var parameter4 = createEle("span","class","para","","","","","");
var parameter4Value = createEle("span","id","para4Value","","","","","");
country.append(parameter4,parameter4Value);
channelInfoContent.append(thumbnail,details);
details.append(title,description,publishedAt,country);
channelInfoBox.append(label1,input1,channelInfoButton, channelHeading ,channelInfoContent)


//on get channel info button click
channelInfoButton.addEventListener("click",()=>{
    var channelInfo = document.getElementById("channelId1").value;
    var url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&key=AIzaSyCGRsNdn6uUE4ZVmmd2lPT9xGCA41x1-aE&part=contentDetails&id=${channelInfo}`;
    getChannelInformation(url);
})

//updating the channel info values
async function getChannelInformation(url){
    try{
        let response=await fetch(url);
        let data=await response.json();
        channelHeading.innerHTML="Channel Information";
        thumbnail.setAttribute("src",data["items"][0]["snippet"]["thumbnails"]["medium"]["url"]);
        parameter1.innerHTML="Title: ";
        parameter1Value.innerHTML = data["items"][0]["snippet"]["title"];
        parameter2.innerHTML="Description: ";
        parameter2Value.innerHTML = data["items"][0]["snippet"]["description"];
        parameter3.innerHTML="Published on: ";
        parameter3Value.innerHTML = data["items"][0]["snippet"]["publishedAt"];
        parameter4.innerHTML="Country: ";
        parameter4Value.innerHTML = data["items"][0]["snippet"]["country"];
    }catch{
        alert("Please check entered channel ID/ check getChannelInformation() (for developer)");
    }
}



// Code for obtaining uploaded videos from channel id:

var uploadedVideosBox = createEle("div","class","uploadedVideosBox","","","","","");
var label2 = createEle("label","for","channelId2","","","","","Enter Channel ID");
var input2 = createEle("input","type","text","id","channelId2","required",true,"");
input2.setAttribute("placeholder","eg: UCipVQOsmaDQ-vDHYoPiP38A ...... (for uploaded videos)");
var button2 = createEle("button","class","button btn","","","","","Get uploaded videos");
var heading2 = createEle("h2","class","heading","","","","","");


uploadedVideosBox.append(label2,input2,button2,heading2);

button2.addEventListener("click", async ()=>{
    var channelInfo = document.getElementById("channelId2").value;
    var url1 = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&key=AIzaSyCGRsNdn6uUE4ZVmmd2lPT9xGCA41x1-aE&part=contentDetails&id=${channelInfo}`;
    var uploadId = await getPlayListID(url1);
    var url2 = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=snippet&maxResults=20&playlistId=${uploadId}&key=AIzaSyCGRsNdn6uUE4ZVmmd2lPT9xGCA41x1-aE`;
    getUploadedVideos(url2);

});

async function getPlayListID(url){
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"];
    } catch(error) {
        alert("Please check entered channel ID/ check getPlayListID() (for developer)");
    }
}

async function getUploadedVideos(url){
    try {
        let response=await fetch(url);
        let data=await response.json();
        var element = document.getElementsByClassName("uploadedVideosContent");
        if(element[0]) {
            element[0].remove();
        }
        var uploadedVideosContent = createEle("div","class","uploadedVideosContent d-flex","","","","","");
        uploadedVideosBox.append(uploadedVideosContent);
        heading2.innerHTML="Uploaded Videos";
        data.items.forEach(video => {
            var contentWraper2 = createEle("div","class","contentWrapper d-flex flex-column","","","","","");
            var thumbnail2 = createEle("img","","","","","","","");
            var title2 = createEle("div","id","title2","","","","","");
            thumbnail2.setAttribute("src", video["snippet"]["thumbnails"]["medium"]["url"]);
            title2.innerHTML = video.snippet.title;
            uploadedVideosContent.append(contentWraper2);
            contentWraper2.append(thumbnail2,title2);
        });
    } catch(error) {
        alert("Something wrong, check getUploadedVideos() (for developer)");
    }
    
}



// Code for obtaining subscriptions from channel id:
var subscriptionsBox = createEle("div","class","subscriptionsBox","","","","","");
var label3 = createEle("label","for","channelId3","","","","","Enter Channel ID");
var input3 = createEle("input","type","text","id","channelId3","required",true,"");
input3.setAttribute("placeholder","eg: UCipVQOsmaDQ-vDHYoPiP38A ...... (for subscriptions)");
var button3 = createEle("button","class","button btn","id","button3","","","Get Subscriptions");
var heading3 = createEle("h2","class","heading","","","","","");


subscriptionsBox.append(label3,input3,button3,heading3);

button3.addEventListener("click", ()=>{
    var channelInfo = document.getElementById("channelId3").value;
    var url = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=${channelInfo}&maxResults=50&key=AIzaSyCGRsNdn6uUE4ZVmmd2lPT9xGCA41x1-aE`;
    getSubscriptions(url);
});

async function getSubscriptions(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        var element = document.getElementsByClassName("subscriptionsContent");
        if(element[0]) {
            element[0].remove();
        }
        var subscriptionsContent = createEle("div","class","subscriptionsContent d-flex","","","","","");
        subscriptionsBox.append(subscriptionsContent);
        heading3.innerHTML="Subscriptions";
        data.items.forEach((video) => {
            var contentWraper3 = createEle("div","class","contentWrapper3 d-flex flex-column","","","","","");
            var thumbnail3 = createEle("img","","","","","","","");
            var title3 = createEle("div","id","title3","","","","","");
            contentWraper3.append(thumbnail3,title3);
            subscriptionsContent.append(contentWraper3);
            thumbnail3.setAttribute("src", video["snippet"]["thumbnails"]["medium"]["url"]);
            title3.innerHTML = video.snippet.title;
        });
    } catch(error) {
        alert("Please check entered channel ID / Getting subscriptions from this channel is not permitted");
    }
   
}



//  Code for obtaining User Activity from channel id:


var userActivityBox = createEle("div","class","userActivityBox","","","","","");
var label4 = createEle("label","for","channelId4","","","","","Enter Channel ID");
var input4 = createEle("input","type","text","id","channelId4","required",true,"");
input4.setAttribute("placeholder","eg: UCipVQOsmaDQ-vDHYoPiP38A ...... (for user activities)");
var button4 = createEle("button","class","button btn","","","","","Get User Activities");
var heading4 = createEle("h2","class","heading","","","","","");
var userActivityContent = createEle("div","class","userActivityContent","","","","","");


userActivityBox.append(label4,input4,button4,heading4,userActivityContent)

button4.addEventListener("click", ()=>{
    var channelInfo = document.getElementById("channelId4").value;
    var url = `https://youtube.googleapis.com/youtube/v3/activities?part=snippet&part=contentDetails&channelId=${channelInfo}&key=AIzaSyCGRsNdn6uUE4ZVmmd2lPT9xGCA41x1-aE&maxResults=50`;
    getUserActivity(url);
});

async function getUserActivity(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        heading4.innerHTML="User Activity";
        var element = document.getElementsByClassName("tableContents");
        if(element[0]) {
            element[0].remove();
        }
        var tableContents = createEle("div","class","tableContents","","","","","");
        var table = createEle("table","class","table table-bordered","","","","","");
        tableContents.append(table);
        var thead = createEle("thead","class","thead thead-dark","","","","","");
        var headerRow = createEle("tr","class","row theadRow","","","","","");
        var tableheader1 = createEle("th","class","col","","","","","Kind");
        var tableheader2 = createEle("th","class","col","","","","","Type");
        var tableheader3 = createEle("th","class","col","","","","","Published on");
        headerRow.append(tableheader1,tableheader2,tableheader3);
        thead.append(headerRow);
        var tbody = createEle("tbody","class","tbody","","","","","");
        if(data.items.length) {
            data.items.forEach((activity)=>{
                var tableRow =  createEle("tr","class","row","","","","","");
                var tableDetail1 = createEle("td","class","col","","","","","");
                var tableDetail2 = createEle("td","class","col","","","","","");
                var tableDetail3 = createEle("td","class","col","","","","","");
                tableRow.append(tableDetail1,tableDetail2,tableDetail3);
                tbody.append(tableRow);
                tableDetail1.innerHTML = activity["kind"];
                tableDetail2.innerHTML = activity["snippet"]["type"];
                tableDetail3.innerHTML = activity["snippet"]["publishedAt"];
            })
        } else {
            var noData = createEle("div", "class", "noData", "", "", "", "", "No Data Found");
            tbody.append(noData);
        }
        table.append(thead,tbody);
        userActivityContent.append(tableContents);
    } catch(error) {
        alert("Please check entered channel ID / Getting subscriptions from this channel is not permitted/ check getUserActivity() (for developer)");
    }
    
}


// Code for obtaining topic based search, playlist search and channel search from channel id:

var topicBasedSearchDiv =   createEle("div","class","topicBasedSearchDiv","","","","","");
var playListSearchDiv =   createEle("div","class","playListSearchDiv","","","","","");
var channelSearchDiv =   createEle("div","class","channelSearchDiv","","","","","");

var topicBasedSearchButton = createEle("button","class","button btn btn-outline-primary btn-sm","","","","","Search");
var playlistSearchButton =  createEle("button", "class","btn btn-outline-primary btn-sm", "", "","","", "Search");
var channelSearchButton =  createEle("button", "class","btn btn-outline-primary btn-sm", "", "","","","Search");

function topicBasedSearch() {
    var searchHeader = createEle("h5","class", "seachHeader","","","","", "Search by giving topic id & search value");
    var searchInputWrapper = createEle("div","class", "searchInputWrapper","","","","","");
    topicBasedSearchDiv.append(searchHeader, searchInputWrapper);
    var topicInput = createEle("input", "class","topicInput", "type", "text","placeholder","Enter Topic Id Here","");
    var searchInput = createEle("input", "class", "searchInput","type", "text","placeholder","search here","");
    searchInputWrapper.append(topicInput, searchInput, topicBasedSearchButton);
}

topicBasedSearch();

function playListSearch() {
    var searchHeader = createEle("h5", "class","seachHeader", "","","","","search by entering any playlist in search box");
    var searchInputWrapper = createEle("div","class", "searchInputWrapper","","","","","");
    playListSearchDiv.append(searchHeader, searchInputWrapper);
    var playlistSearchInput = createEle("input","class", "playlistSearchInput", "type", "text","placeholder","search playlists here","");
    searchInputWrapper.append( playlistSearchInput, playlistSearchButton);
}

playListSearch();

function channelSearch() {
    var searchHeader = createEle("h5", "class","seachHeader","","","","","search by entering channel name in search box");
    var searchInputWrapper = createEle("div", "class","searchInputWrapper","","","","","");
    channelSearchDiv.append(searchHeader, searchInputWrapper);
    var channelSearchInput = createEle("input", "class","channelSearchInput", "type", "text","placeholder","search channels here","");
    searchInputWrapper.append( channelSearchInput, channelSearchButton);
}


channelSearch();

topicBasedSearchButton.addEventListener("click", async () => {
    try {
        var searchValue = document.getElementsByClassName("searchInput")[0].value;
        var topicId = document.getElementsByClassName("topicInput")[0].value || "/m/04rlf"; // if no topic id is entered, defaultly it will take music id
        let result = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchValue}&topicId=${topicId}&type=video&key=AIzaSyCGRsNdn6uUE4ZVmmd2lPT9xGCA41x1-aE`);
        let searchInfo = await result.json();
        console.log("hello i am showing search results", searchInfo);
        showSearchResults(searchInfo, "topicBasedSearchDiv");
    } catch(error) {
        alert("something wrong while getting your topic based search results");
    }
});


async function getPlayListChannelResults(type, value) {
    try {
        let result = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${value}&type=${type}&key=AIzaSyCGRsNdn6uUE4ZVmmd2lPT9xGCA41x1-aE&maxResults=50`);
        let searchInfo = await result.json();
        console.log("hello i am showing playlist/channel search results", searchInfo);
        showSearchResults(searchInfo, type==="playlist" ? "playListSearchDiv" : "channelSearchDiv");
    } catch(error) {
        alert("something wrong while getting your playlist/channel search results");
    }
}

playlistSearchButton.addEventListener("click", () => {
    var searchValue = document.getElementsByClassName("playlistSearchInput")[0].value;
    getPlayListChannelResults("playlist", searchValue);
});

channelSearchButton.addEventListener("click", () => {
    var searchValue = document.getElementsByClassName("channelSearchInput")[0].value;
    getPlayListChannelResults("channel", searchValue);
});


function showSearchResults(searchInfo, elemName) {
    var elem = document.getElementsByClassName(elemName)[0];
    if(elem.getElementsByClassName("searchResultsWrapper") && elem.getElementsByClassName("searchResultsWrapper")[0]) {
        elem.getElementsByClassName("searchResultsWrapper")[0].remove();
    }
    var searchResultsWrapper = createEle("div", "class","searchResultsWrapper", "","","","","");
    elem.append(searchResultsWrapper);
    var seachResultsHeader = createEle("h4", "class", "seachResultsHeader", "","","","","Showing results based on the search value");
    var searchContentWrapper = createEle("div", "class","searchContentWrapper","","","","","");
    searchResultsWrapper.append(seachResultsHeader, searchContentWrapper);
    searchInfo.items.forEach((subscription) => {
        var searchInfoWrapper = createEle("div", "class","searchInfoWrapper","","","","","");
        searchContentWrapper.append(searchInfoWrapper);
        var searchThumbnail = createEle("img","class", "searchThumbnail", "src", subscription["snippet"]["thumbnails"]["medium"]["url"],"","","");
        var seachInfoDiv = createEle("div", "class","seachInfo", "","","","",subscription["snippet"]["title"]);
        searchInfoWrapper.append(searchThumbnail, seachInfoDiv);
    });
}

//create playlist functionality
var createPlayListDiv =   createEle("div","class","createPlayListDiv","","","","","");
var createPlayListButton = createEle("button", "class","btn btn-outline-primary btn-sm", "type", "button", "","","Create Playlist");

function createPlayList() {
    var createPlayListHeader = createEle("h5","class", "createPlayListHeader", "","","","","Create plalylist by giving title & description");
    var title = createEle("input","class", "titleInput", "type", "text","placeholder","Enter title name here","");
    var description = createEle("input", "class","descriptionInput","type", "text","placeholder","Enter description here","");
    createPlayListDiv.append(createPlayListHeader, title, description, createPlayListButton);
}

createPlayList();

createPlayListButton.addEventListener("click", async () => {
    var titleValue = document.getElementsByClassName("titleInput")[0].value;
    var description = document.getElementsByClassName("descriptionInput")[0].value;
    var snippetData ={
        title: titleValue,
        description: description
    };
    var data = {
        snippet: snippetData
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        let result = await fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&part=id&key=AIzaSyCGRsNdn6uUE4ZVmmd2lPT9xGCA41x1-aE`, 
            options);
        let playListInfo = await result.json();
         if(playListInfo.error)
        {
            throw new Error(playListInfo.error.message)
        }
        console.log("hello i am showing newly created playlist", playListInfo);
    } catch(e) {
        alert(e.message);
    }
});


containerMain.append(channelInfoBox, uploadedVideosBox, subscriptionsBox, userActivityBox, topicBasedSearchDiv,playListSearchDiv,channelSearchDiv,createPlayListDiv);
document.body.append(containerMain);