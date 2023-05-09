const rgbTarget = [...Array(3)].map(i => Math.floor(Math.random() * 256));
document.querySelector('#main').style.backgroundColor = rgbColor(rgbTarget);

const colors = [...Array(9 * 10 - 1)].map((_, j) => {
    if (j % 6 == 0) {
        return [rgbTarget[0], rgbNum(), rgbNum()];
    } else if (j % 6 == 1) {
        return [rgbNum(), rgbTarget[1], rgbNum()];
    } else if (j % 6 == 2) {
        return [rgbNum(), rgbNum(), rgbTarget[2]];
    } else if (j % 6 == 3) {
        return [rgbTarget[0], rgbTarget[1], rgbNum()];
    } else if (j % 6 == 4) {
        return [rgbTarget[0], rgbNum(), rgbTarget[2]];
    } else if (j % 6 == 5) {
        return [rgbNum(), rgbTarget[1], rgbTarget[2]];
    }
});
colors.push(rgbTarget);

let count = 0;
let select = null;
while (colors.length) {
    if (count++ % 9 == 0) {
        select = document.createElement('div');
        select.classList.add('flex_center');
        document.querySelector('.select').append(select);
    }
    let i = Math.floor(Math.random() * colors.length);
    let color = colors.splice(i, 1);

    const box = document.createElement('div');
    box.classList.add('box');
    box.style.backgroundColor = rgbColor(color);
    select.append(box);
    box.addEventListener('click', () => isColor(box));
}

document.querySelector('#red').addEventListener('click', () => hint(0));
document.querySelector('#green').addEventListener('click', () => hint(1));
document.querySelector('#blue').addEventListener('click', () => hint(2));

function rgbNum() {
    return Math.floor(Math.random() * 256);
}

function rgbColor(args) {
    return 'rgb(' + args.join(',') + ')';
}

function hint(i) {
    document.querySelectorAll('.box').forEach(v => {
        let c = v.style.backgroundColor.match(/\d+/g);
        if (c[i] != rgbTarget[i]) {
            v.style.opacity = 0;
        }
    });
}

function isColor(box) {
    if (box.style.backgroundColor == document.querySelector('#main').style.backgroundColor) {
        alert('正解！');
    } else {
        alert('ちがうよ！');
    }
}