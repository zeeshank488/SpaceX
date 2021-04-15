window.addEventListener('DOMContentLoaded', boot)


async function boot() {
    apiAndTemplateHandler();
}

async function apiAndTemplateHandler() {
    const containerEl = document.querySelector('#item-container')
    try {
        const listData = await fetchSpacexData();
        listData.forEach(el => {
            addNewNodeToContainer(containerEl, el);
        })
    } catch (error) {

    }
}


function addNewNodeToContainer(parentNode, details) {
    const newNode = document.createElement('div');
    const newFig = document.createElement('figure');
    const innerDiv = document.createElement('div');
    const imgEl = document.createElement('img');
    const heading = document.createElement('h1');
    const headingAnchor = document.createElement('a');
    headingAnchor.innerText = details.mission_name;
    headingAnchor.href = details.links.article_link;
    headingAnchor.target = '_blank';
    heading.appendChild(headingAnchor);
    imgEl.src = details.links.mission_patch;
    newFig.appendChild(imgEl);
    innerDiv.classList.add('misn-body');
    innerDiv.appendChild(heading);
    newNode.classList.add('mission-box');
    newNode.appendChild(newFig);
    newNode.appendChild(innerDiv);
    createContentNode(newNode, details.mission_id.length > 0 ? details.mission_id[0] : '', 'Mission Ids')
    createContentNode(newNode, details.launch_year, 'Launch Year')
    createContentNode(newNode, details.launch_success, 'Succesfull Launch')
    createContentNode(newNode, details.tbd, 'Succesfull Landing')
    parentNode.appendChild(newNode);
}

function createContentNode(parentNode, data, heading) {
    const container = document.createElement('div');
    const strongEl = document.createElement('strong');
    const pEl = document.createElement('p');
    strongEl.innerText = heading;
    pEl.innerText = data;
    container.classList.add('dtl-row');
    container.appendChild(strongEl)
    container.appendChild(pEl);
    parentNode.appendChild(container);
}
async function testEl(arr = []) {
    const containerEl = document.querySelector('#item-container');
    arr.forEach(el => {

    })
}



function fetchSpacexData() {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch('https://api.spaceXdata.com/v3/launches?limit=50');
            const data = await res.json();
            resolve(data);
        } catch (error) {
            reject(data);
        }
    })
}