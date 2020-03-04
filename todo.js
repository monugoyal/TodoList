function addTodoList() {
    var sub = document.getElementById('subject').value;
    var des = document.getElementById('description').value;
    var status = document.getElementById('status').options[document.getElementById('status').selectedIndex].value;
    var issue = document.getElementById('issue').options[document.getElementById('issue').selectedIndex].value;
    var prority = document.getElementById('prority').options[document.getElementById('prority').selectedIndex].value;
    var assignee = document.getElementById('assignee').options[document.getElementById('assignee').selectedIndex].value;

    var myObject = {
        Subject: sub,
        Description: des,
        Status: status,
        IssueType: issue,
        Priority: prority,
        Assignee: assignee
    };
    var myObjectJson = JSON.stringify(myObject);
    localStorage.setItem(localStorage.length + 1, myObjectJson);
    document.getElementById('id01').style.display = 'none';
    showAllLocalData(status);
    resetSubmitField();
}

window.onload = function (event) {
    showAllLocalData('todo', 'inprogress', 'inpr', 'qa', 'uat');
}

function showAllLocalData(...args) {
    var argslength = args.length;
    var storageLen = localStorage.length;
    for (var i = 0; i < argslength; i++) {
        var text = '';
        for (var j = 1; j <= storageLen; j++) {
            if (!localStorage.getItem(j)) {
                continue;
            }
            var newObject = localStorage.getItem(j) && localStorage.getItem(j);
            var myNewObject = JSON.parse(newObject);
            if (myNewObject.Status === args[i]) {
                text = text + `<div id=` + j + ` class= "contentWithId" onclick = "contentOnClick(this.id)" draggable="true" ondragstart="drag(event)" >
                <div> CD-` + j + `</div>
                <div class="contentHead">` + myNewObject.Subject + `</div><div class="issueAndPriority">
                <div>`+ myNewObject.IssueType + `</div>&nbsp;&nbsp;<div>` + myNewObject.Priority + ` </div></div></div >`;
            }
        }
        document.getElementById(args[i]).innerHTML = text;
    }
}

function contentOnClick(contentId) {
    document.getElementById('id01').style.display = 'block';
    var newMyObjectJSON = localStorage.getItem(contentId);
    var newMyObject = JSON.parse(newMyObjectJSON);
    document.getElementById('subject').value = newMyObject.Subject;
    document.getElementById('description').value = newMyObject.Description;
    document.getElementById('status').value = newMyObject.Status;
    document.getElementById('issue').value = newMyObject.IssueType;
    document.getElementById('prority').value = newMyObject.Priority;
    document.getElementById('assignee').value = newMyObject.Assignee;
    var submitdiv = document.getElementById('submitField');
    submitdiv.innerText = "Edit";
    submitdiv.setAttribute("onclick", "editStatus(" + contentId + ")");
    var deleteDiv = document.getElementById('deleteField');
    deleteDiv.innerText = "Delete";
    deleteDiv.setAttribute("onclick", "deleteStatus(" + contentId + ")");
}

function editStatus(contentid) {
    var currStatus = document.getElementById('status').options[document.getElementById('status').selectedIndex].value;
    changeStatus(contentid, currStatus);
    resetSubmitField();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    if (ev.target.id === "todo" || ev.target.id === "inprogress" || ev.target.id === "inpr" || ev.target.id === "qa" || ev.target.id === "uat") {
        var data = ev.dataTransfer.getData("text");
        changeStatus(data, ev.target.id);
    }
}

function changeStatus(pre_id, curr) {
    var newMyObjectJSON = localStorage.getItem(pre_id);
    var newMyObject = JSON.parse(newMyObjectJSON);
    var preStatus = newMyObject.Status;
    newMyObject.Status = curr;
    localStorage.setItem(pre_id, JSON.stringify(newMyObject));
    showAllLocalData(preStatus, curr);
}

function resetSubmitField() {
    toEmptyFields();
    document.getElementById('id01').style.display = 'none';
    document.getElementById('deleteField').innerText = '';
    var submitdiv = document.getElementById('submitField');
    submitdiv.innerText = "Submit";
    submitdiv.setAttribute("onclick", "addTodoList()");
}

function toEmptyFields() {
    document.getElementById('subject').value = "";
    document.getElementById('description').value = "";
    document.getElementById('status').value = document.getElementById('status').options[0].value;
    document.getElementById('issue').value = document.getElementById('issue').options[0].value;
    document.getElementById('prority').value = document.getElementById('prority').options[0].value;
    document.getElementById('assignee').value = document.getElementById('assignee').options[0].value;
}

function deleteStatus(id) {
    var newMyObjectJSON = localStorage.getItem(id);
    var newMyObject = JSON.parse(newMyObjectJSON);
    var status = newMyObject.Status;
    localStorage.removeItem(id);
    showAllLocalData(status);
    resetSubmitField();
}