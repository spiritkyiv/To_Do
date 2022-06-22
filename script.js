window.onload = function () {
    let TableButtons = document.querySelectorAll(`[class=fa-parent]`),
        Modal_window = document.getElementById("Post_Modal"),
        close_span = document.getElementById("close"),
        add_button = document.getElementById("adder"),
        table = document.getElementById("table"),
        add_task = document.getElementById("Add_modal"),
        Exit_modal = document.getElementById("Exit_modal");
        let DeleteButton = (cell, id) => {
            if (Standart_db.has(id)){
                Standart_db.delete(id);
                if (Standart_db.has(id) == false) {
                    table.deleteRow(cell.parentNode.rowIndex);
                }
            }
            clearInterval(cell.parentNode.childNodes[6].childNodes[0].id);
        }
    /////

    function UpdateTimer(id, start, end) {
        var now = new Date().getTime();
        var timeleft = end - now;
        
        var t_all_days = Math.floor((end - start) / (1000 * 60 * 60 * 24))

        var t_days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        var t_hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var t_minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        var t_seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        ///
        let day = document.getElementById("day"+id),
            hour = document.getElementById("hour"+id),
            minutes = document.getElementById("minutes"+id),
            seconds = document.getElementById("seconds"+id),
            ampm = document.getElementById("ampm"),

            dd = document.getElementById("dd"+id),
            hh = document.getElementById("hh"+id),
            mm = document.getElementById("mm"+id),
            ss = document.getElementById("ss"+id),

            dd_dot =  document.getElementById('dd_dot'+id),
            hr_dot =  document.getElementById('hh_dot'+id),
            min_dot = document.getElementById('mm_dot'+id),
            sec_dot = document.getElementById('ss_dot'+id),

            d = t_days,
            h = t_hours,
            m = t_minutes,
            s = t_seconds;

        day.innerHTML = d + `<sub class="sub_circle">dd</sub>`  
        hour.innerHTML = h + `<sub class="sub_circle">hh</sub>`
        minutes.innerHTML = m + `<sub class="sub_circle">min</sub>`
        seconds.innerHTML = s + `<sub class="sub_circle">sec</sub>`

        dd.style.strokeDashoffset = 190 - (190 * d) / t_all_days
        hh.style.strokeDashoffset = 190 - (190 * h) / 24;
        mm.style.strokeDashoffset = 190 - (190 * m) / 60;
        ss.style.strokeDashoffset = 190 - (190 * s) / 60;

        dd_dot.style.transform = `rotate(${d * (360 / t_all_days)}deg)`
        hr_dot.style.transform = `rotate(${h * 15}deg)`
        min_dot.style.transform = `rotate(${m * 6}deg)`
        sec_dot.style.transform = `rotate(${s * 6}deg)`
    }

    let edit_button = `<td id="edit_click" class="fa-parent"">
    <i class="fas fa-edit"></i>
            </td>`;
    let delete_button = `<td id="delete_click" class="fa-parent">
        <i class="fas fa-trash-alt"></i>
    </td>`;

    let complete_button = `<td id="complete_click" class="fa-parent">
        <i class="fas fa-check"></i>
    </td>`;

    function timer_html(id, timer_id) { return `<div class="time" id="${timer_id}">
    <div class="circle" style="--clr:#29cdff;">
        <div class="dots dd_dot" id="dd_dot${id}"></div>
        <svg>
            <circle cx="30" cy="30" r="30"></circle>
            <circle cx="30" cy="30" r="30" id="dd${id}"></circle>
        </svg>
        <div id="day${id}">0</div>
    </div>
    <div class="circle" style="--clr:#ff2972;">
        <div class="dots hr_dot" id="hh_dot${id}"></div>
        <svg>
            <circle cx="30" cy="30" r="30"></circle>
            <circle cx="30" cy="30" r="30" id="hh${id}"></circle>
        </svg>
        <div id="hour${id}">00</div>
    </div>
    <div class="circle" style="--clr:#fee800;">
        <div class="dots min_dot" id="mm_dot${id}"></div>
        <svg>
            <circle cx="30" cy="30" r="30"></circle>
            <circle cx="30" cy="30" r="30" id="mm${id}"></circle>
        </svg>
        <div id="minutes${id}">00</div>
    </div>
    <div class="circle" style="--clr:#04fc43;">
        <div class="dots sec_dot" id="ss_dot${id}"></div> 
        <svg>
            <circle cx="30" cy="30" r="30"></circle>
            <circle cx="30" cy="30" r="30" id="ss${id}"></circle>
        </svg>
        <div id="seconds${id}">00</div>
    </div>
    
</div>`};

// <div class="ap">
    //     <div id="ampm">AM</div>
    // </div>
    function RandomId() {
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }

    var Standart_db = new Map();
    let rand1 = RandomId();
    let rand2 = RandomId();
    let rand3 = RandomId();
    Standart_db.set(rand1, new Task(rand1, 1655102700000, "Books", "111", "Read jonathan strange & mr norrell", 1656075000000));
    Standart_db.set(rand2, new Task(rand2, 1655239219561, "Programm", "Todo`s project", "Create todos project with clear JS", 1658667000000));
    Standart_db.set(rand3, new Task(rand3, 1655239219561, "Books", "jonathan strange & mr norrell", "Read jonathan strange & mr norrell", 1657528402000));

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

            OwnTask.Edit = [category, task_name, task_text, task_deadline];

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
        delete_button_e.onclick = () => DeleteButton(delete_button_e, task.id, timer_id);
        // delete_button_e.addEventListener('click', () => {
        //     DeleteButton(delete_button_e)
        // });
        ///
        // console.log(Standart_db);
        let complete_button_e = new_row.insertCell(9);
        complete_button_e.innerHTML = complete_button;
        complete_button_e.id = `complete_click`;
        complete_button_e.className = `fa-parent`;
        complete_button_e.addEventListener('click', () => {
            CompleteButton(complete_button_e, timer_id);
        });
        ///
        row_id.innerHTML = '1';
        row_create_date.innerHTML = Formated_Time(task.date_create);
        row_category.innerHTML = task.category;
        row_name.innerHTML = task.name;
        row_text.innerHTML = task.text;
        row_deadline.innerHTML = Formated_Time(task.date_end);
        let TimeLeft = GetTimeDifference(task.date_create, task.date_end)
        timer_id = setInterval(UpdateTimer, 1000, task.id, task.date_create, task.date_end);

        row_datefortext.innerHTML = timer_html(task.id, timer_id);

        //
       
        //
        console.log(timer_id);
        RecountTable();
    }

    function GetTimeDifference(date_start, date_end) {
        let days = 0;
        let decimalTime = (24 + ((date_end - date_start - (1000 * 3600 * 24)) / (1000 * 3600)));
        decimalTime = decimalTime * 60 * 60;
        let hours = Math.floor((decimalTime / (60 * 60)));
        decimalTime = decimalTime - (hours * 60 * 60);
        let minutes = Math.floor((decimalTime / 60));
        decimalTime = decimalTime - (minutes * 60);
        let seconds = Math.round(decimalTime);
        if (hours >=24) {
            days = Math.floor(hours / 24);
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return [days, hours, minutes, seconds];
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
    console.log(new Date(new Date(task.date_end).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]);

    document.getElementById("input_deadline").value = new Date(new Date(task.date_end).toString().split('GMT')[0] + ' UTC').toISOString().slice(0, 16);
}


let CompleteButton = (el,timer_id) => {
    clearInterval(timer_id);
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

    set Edit(value) {
        [this.category, this.name, this.text, this.date_end] = value;
    }

    get Test() {
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