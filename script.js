window.onload = function () {
    let TableButtons = document.querySelectorAll(`[class=fa-parent]`);
    let Modal_window = document.getElementById("Post_Modal");
    let close_span = document.getElementById("close");
    let add_button = document.getElementById("adder");
    let table = document.getElementById("table");
    let add_task = document.getElementById("Add_modal");
    let Exit_modal = document.getElementById("Exit_modal");

    let edit_button = `<td id="edit_click" class="fa-parent" onclick="console.log("222")">
    <i class="fas fa-edit"></i>
            </td>`;
    let delete_button = `<td id="delete_click" class="fa-parent">
        <i class="fas fa-trash-alt"></i>
    </td>`

    let complete_button = `<td id="complete_click" class="fa-parent">
        <i class="fas fa-check"></i>
    </td>`

    function RandomId() {
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }

    let Standart_db = new Map();
    let rand1 = RandomId();
    let rand2 = RandomId();
    let rand3 = RandomId();
    Standart_db.set(rand1, new Task(rand1, 1655239219561, "Books", "111", "Read jonathan strange & mr norrell", 1655239219561));
    Standart_db.set(rand2, new Task(rand2, 1655239219561, "Programm", "Todo`s project", "Create todos project with clear JS", 1655239219561));
    Standart_db.set(rand3, new Task(rand3, 1655239219561, "Books", "jonathan strange & mr norrell", "Read jonathan strange & mr norrell", 1655239219561));

    Standart_db.forEach((item) => {
        DisplayNewRow(item);
    })

    function GetTask(id) {
        return Standart_db.get(id);
    }

    let Archiv_arr = [];

    window.onclick = (e) => {
        if (e.target == Modal_window) {
            Modal_window.style.display = 'none';
        }
    }

    close_span.onclick = () => {
        Modal_window.style.display = 'none';
    }

    add_task.onclick = () => {

        let task_name = document.getElementById("input_name").value;
        let category = document.getElementById("input_category").value;
        let task_text = document.getElementById("input_text").value;
        let task_deadline = document.getElementById("input_deadline").value;
        
        if (add_task.innerText == "Add task") {

            let newid = RandomId();

            let Added_task = new Task(newid, null, category, task_name, task_text, task_deadline);

            Standart_db.set(newid, Added_task);
            DisplayNewRow(Added_task);
        
            

        } else {
            
            let OwnTask = Standart_db.get(Number(document.getElementsByClassName("post_content")[0].childNodes[1].id));

            OwnTask.Edit = [task_name, category, task_text, task_deadline];

            EditRow(OwnTask);

        }
        Modal_window.style.display = 'none';
    }

    function EditRow(OwnTask) {
        document.getElementById(OwnTask.id).childNodes[2].innerHTML = OwnTask.category;
        document.getElementById(OwnTask.id).childNodes[3].innerHTML = OwnTask.name;
        document.getElementById(OwnTask.id).childNodes[4].innerHTML = OwnTask.text;
        document.getElementById(OwnTask.id).childNodes[5].innerHTML = Formated_Time(OwnTask.date_end);
    }

    Exit_modal.onclick = () => {
        Modal_window.style.display = 'none';
    }

    function DisplayNewRow(task) {
        let new_row = table.insertRow(1);
        new_row.id = task.id;
        let row_id = new_row.insertCell(0)
        let row_create_date = new_row.insertCell(1);
        let row_category = new_row.insertCell(2);
        let row_name = new_row.insertCell(3);
        let row_text = new_row.insertCell(4);
        let row_deadline = new_row.insertCell(5);
        let row_datefortext = new_row.insertCell(6);
        /// 
        let edit_button_e = new_row.insertCell(7);
        edit_button_e.innerHTML = edit_button;
        edit_button_e.id = `edit_click`;
        edit_button_e.className = `fa-parent`;
        edit_button_e.addEventListener('click', () => {
            EditButton(edit_button_e, Modal_window, task)
        });
        ///
        let delete_button_e = new_row.insertCell(8);
        delete_button_e.innerHTML = delete_button;
        delete_button_e.id = `delete_click`;
        delete_button_e.className = `fa-parent`;
        delete_button_e.addEventListener('click', () => {
            DeleteButton(delete_button_e)
        });
        ///
        let complete_button_e = new_row.insertCell(9);
        complete_button_e.innerHTML = complete_button;
        complete_button_e.id = `complete_click`;
        complete_button_e.className = `fa-parent`;
        complete_button_e.addEventListener('click', () => {
            CompleteButton(complete_button_e);
        });
        ///
        row_id.innerHTML = '1';
        row_create_date.innerHTML = Formated_Time(task.date_create);
        row_category.innerHTML = task.category;
        row_name.innerHTML = task.name;
        row_text.innerHTML = task.text;
        row_deadline.innerHTML = Formated_Time(task.date_end);
        row_datefortext.innerHTML = task.date_end;

        RecountTable();
    }

    add_button.onclick = () => {
        Modal_window.style.display = 'block';
        add_task.innerHTML = "Add task";
    }

}

let EditButton = (el, Modal_window, task) => {
    Modal_window.style.display = 'block';
    let add_task = document.getElementById("Add_modal");
    add_task.innerHTML = "Edit task";
    document.getElementsByClassName("post_content")[0].childNodes[1].id = task.id
    document.getElementById("input_name").value = task.name;
    document.getElementById("input_category").value = task.category;
    document.getElementById("input_text").value = task.text;
    console.log(new Date(new Date(task.date_end).toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]);
    
    document.getElementById("input_deadline").value = new Date(new Date(task.date_end).toString().split('GMT')[0]+' UTC').toISOString().split('.')[0];
}

let DeleteButton = (el) => {
    table.deleteRow(el.parentNode.rowIndex);
}
let CompleteButton = (el) => {
    RecountTable();
}

let ArchivePost = () => {

}

class Task {
    constructor(id, date_start = false, category, name, text, date_end, data_text, archiv = false) {
        this.id = id;
        this.date_create = date_start;
        this.category = category;
        this.name = name;
        this.text = text;
        this.date_end = date_end;
        this.archive = archiv;
        this.date_from_text = `text ` + Formated_Time();
    }

    set Edit(value){
        [this.category, this.name, this.text, this.date_end] = value;
    }

    get Test(){
        return this.text;
    }

}

let Formated_Time = (p_date) => {

    let date = p_date ? new Date(p_date) : new Date();
    let options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        secod: "numeric"
    }

    return date.toLocaleString("en-US", options);
}

let RecountTable = () => {
    let tch = document.querySelectorAll("#table tbody tr");
    for (x = 1; x < tch.length; x++) {
        tch[x].childNodes[0].innerHTML = x;
    }
}