const div = document.getElementById("showcase");
const colortable = ["AliceBlue","AntiqueWhite","Aqua","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
const days = ["월", "화", "수", "목", "금", "토", "일"];

let colori = 0


function makeTable(row, col) {
    const table = document.createElement("table");
    table.style = "border: 1px solid #444444;";
    for(var i=0;i<col+1;i++) {
        const tr = document.createElement("tr");
        for(var j=0;j<row;j++) {
            const td = document.createElement("td");
            if(i == 0) {
                td.innerHTML = days[j % 7] + "요일";
                td.style = "width: 200px; height: 200px; text-align: center; color: White; background-color: Aquamarine;";
            } else {
                td.innerHTML = days[j % 7] + "요일 " + i + "교시";
                td.style = "width: 200px; height: 200px; text-align: center; color: White; background-color: LightBlue;";
            }
            td.id = j + ":" + i;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    div.appendChild(table);
}

function changeTable(row, col, name, colorindex) {
    const td = document.getElementById(row + ":" + col);
    if(td.innerHTML != days[row % 7] + "요일 " + col + "교시") {
        message(days[row % 7] + "요일 " + col + "교시: 시간 충돌!");
    }
    td.innerHTML = days[row % 7] + "요일 " + col + "교시: " + name;
    td.style = "width: 200px; height: 200px; text-align: center; color: White; background-color: " + colortable[colorindex % colortable.length] + ";";
}

function message(s) {
    document.getElementById("message").innerHTML = s;
}

makeTable(5, 12);

document.getElementById("append").onclick = function() {
    let s = document.getElementById("box").value;
    let lec = document.getElementById("lecture").value;
    let arr = s.split(',');
    for(var i=0;i<arr.length;i++) {
        let parsed = arr[i].trim();
        let day = days.findIndex((elem) => elem == parsed[0]);
        if(day != -1) {
            let twonum = parsed.split(" ")[1].trim().split("~");
            if(twonum.length == 2) {
                for(var j=parseInt(twonum[0]);j<=parseInt(twonum[1]);j++) {
                    changeTable(day, j, lec, colori);
                }
            } else if(twonum.length == 1) {
                changeTable(day, twonum[0], lec, colori);
            }
        }
        else {
            message("파싱 실패!")
        }
    }
    colori++;
};