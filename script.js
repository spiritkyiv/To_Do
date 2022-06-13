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

        let Added_task = new Task(category, task_name, task_text, task_deadline);

        DisplayNewRow(Added_task);

        Modal_window.style.display = 'none';

    }

    Exit_modal.onclick = () => {

        Modal_window.style.display = 'none';

    }

    function DisplayNewRow(task) {
        let new_row = table.insertRow(1);
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
            EditButton(edit_button_e)
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
        row_create_date.innerHTML = task.date_create;
        row_category.innerHTML = task.category;
        row_name.innerHTML = task.name;
        row_text.innerHTML = task.text;
        row_deadline.innerHTML = task.date_end;
        row_datefortext.innerHTML = task.date_end;

        RecountTable();
    }

    add_button.onclick = () => {
        Modal_window.style.display = 'block';
    }

    TableButtons.forEach((item) => {
        switch (item.id) {
            case 'edit_click':
                item.addEventListener("click", () => {
                    EditButton(item);
                });
                break;
            case 'delete_click':
                item.addEventListener("click", () => {
                    DeleteButton(item);
                })
                break;
            case 'complete_click':
                item.addEventListener("click", () => {
                    CompleteButton(item)
                })
                break;
            default:
                break;
        }
    })
}

let EditButton = (el) => {
    // RowDataToObj(el)
    console.log(el);
}
let DeleteButton = (el) => {
    table.deleteRow(el.parentNode.rowIndex);
}
let CompleteButton = (el) => {
    // console.log("I`m completed");
    RecountTable();
}

let ArchivePost = () => {

}

let RowDataToObj = (el) => {
    let row_data = el.parentNode;
    let date_create = el.parentNode.childNodes[3].innerHTML;
    let category = el.parentNode.childNodes[5].innerHTML;
    let name = el.parentNode.childNodes[7].innerHTML;
    let text = el.parentNode.childNodes[9].innerHTML;
    let date_end = el.parentNode.childNodes[11].innerHTML;
    let data_text = el.parentNode.childNodes[13].innerHTML;
    let date_from_text = el.parentNode.childNodes[15].innerHTML;
    let post1 = new Task(date_create, category, name, text, date_end, data_text, date_from_text);
    console.log(post1);
}

let AddRow = (task) => {
    table.AddRow()
    // let new_task = 
}

class Task {
    constructor(category, name, text, date_end, data_text, archiv = false) {
        this.date_create = Formated_Time();
        this.category = category;
        this.name = name;
        this.text = text;
        this.date_end = Formated_Time(date_end);
        // this.data_text = data_text;
        this.date_from_text = `text ` + Formated_Time();
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
        console.log(tch[x].childNodes);
        // tch[x].childNodes[0].innerHTML = x;
    }
}