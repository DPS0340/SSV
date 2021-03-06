const colortable = ["Aqua","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
const daysArray = ["월", "화", "수", "목", "금", "토", "일"];

let colori = 0;

let colors = new Map();

let editing = false;

let tdarr = [];

function makeTable(days, times) {
    const row = days;
    const col = times;
    const div = document.getElementById("showcase");
    const table = document.createElement("table");
    table.id = "table";
    table.className = "table table-bordered";
    for(let i=0;i<col+1;i++) {
        const tr = document.createElement("tr");
        for(let j=0;j<row;j++) {
            const td = document.createElement("td");
            if(i === 0) {
                td.innerHTML = daysArray[j % 7] + "요일";
                td.style = "width: 10%; height: 150px; text-align: center; color: White; background-color: Aquamarine;";
                td.classList.add("col-md-1");
            } else {
                td.innerHTML = daysArray[j % 7] + "요일 " + i + "교시";
                td.classList.add("col-md-1");
                td.style = "width: 10%; height: 150px; text-align: center; color: White; background-color: LightBlue;";
                const func = function() {
                    const st = td.style.cssText;
                    td.style = st + "border: 1px solid " + colortable[colori % colortable.length] + ";";
                    if(!editing) {
                        const overridediv = document.createElement("div");
                        const confirm = document.createElement("button");
                        const decline = document.createElement("button");
                        const input = document.createElement("input");
                        confirm.classList.add("btn", "btn-primary");
                        decline.classList.add("btn", "btn-primary");
                        confirm.innerHTML = "확인";
                        decline.innerHTML = "취소";
                        input.placeholder = "프로그래밍";
                        overridediv.appendChild(input);
                        overridediv.appendChild(document.createElement("br"));
                        overridediv.appendChild(confirm);
                        overridediv.appendChild(decline);
                        td.appendChild(overridediv);
                        const remove = function() {
                            overridediv.remove();
                            editing = false;
                            for(let i=0;i<tdarr.length;i++) {
                                const td = tdarr[i];
                                td.style.border = "none";
                            }
                            tdarr = [];
                        };
                        td.onclick = function(e) {
                            e = window.event || e;
                            if(this === e.target) {
                                remove();
                                td.onclick = func;
                            }
                        };
                        const submit = function() {
                            if(input.value) {
                                for(let i=0;i<tdarr.length;i++) {
                                    const td = tdarr[i];
                                    changeTable(td.id.split(":")[0], td.id.split(":")[1], input.value, colori, false);
                                    td.style.border = "none";
                                }
                                tdarr = [];
                                remove();
                                colori++;
                            }
                        };
                        decline.onclick = function() {
                            remove();
                        };
                        confirm.onclick = submit
                        input.addEventListener("keyup", function(event) {
                            if (event.keyCode === 13) {
                                submit();
                            }
                        });
                        editing = true;
                    }
                    tdarr.push(td);
                };
                td.onclick = func;
            }
            td.id = j + ":" + i;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    div.appendChild(table);
    const printButton = document.createElement("button");
    printButton.classList.add("btn", "btn-primary");
    printButton.innerHTML = "프린트";
    printButton.onclick = function() {
        printData();
    };
    div.appendChild(printButton);
    document.getElementById("main").style.margin = "auto";
    document.getElementById("main").style.display = "block";
}


function changeTable(row, col, name, colorindex, override=false) {
    const td = document.getElementById(row + ":" + col);
    colors.set(row + ":" + col, colorindex);
    td.innerHTML = daysArray[row % 7] + "요일 " + col + "교시: " + name;
    td.style = "width: 10%; height: 150px; text-align: center; color: White; background-color: " + colortable[colorindex % colortable.length] + " !important;";
}

function printData() {
    const divToPrint = document.getElementById("table");
    const newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
}
