let count=1, total=0, correct=0, wrong=0, lim=0;
let ans = "", question ="", input="", width= 220, t = '', n1, n2, n3, r1, r2, mode=0;
let opr = [];

$(document).ready(function() {
    $("quizbody").hide();
});

function level(lvl) {
    if (lvl<4) {
        opr = ["+", "-", "*"];        
        if (lvl==1)
            lim = 5;
        else if (lvl==2)
            lim = 10;
        else if (lvl==3)
            lim = 15;
        else if (lvl==4)
            lim = 30;            
    }
    else if (lvl==4) {
        lim = 50;
        opr = ["+", "-", "*", "*"];
    }
    $("diff").hide();
    $("quizbody").show();
    if (mode==1) {
        $("donebtn").hide();
    }
    else {
        $("donebtn").show();
    }
    quiz();
}

function quiz() {
    let len = opr.length;    
    n1 = Math.floor(Math.random() * lim);
    n2 = Math.floor(Math.random() * lim);
    n3 = Math.floor(Math.random() * lim);    
    r1 = opr[Math.floor(Math.random()*len)];
    r2 = opr[Math.floor(Math.random()*len)];    
    question = n1+r1+n2+r2+n3;
    ans = eval(question);
    $("question").html(question+" = ?");
    t = setInterval(timeCheck, 120);
}

function check() {
    let input = $("answer").val();
    if(input == ans) {
        Swal.fire({
          icon: 'success',
          title: 'Correct',
          text: ans + ' is correct.',
          showConfirmButton: false,
          timer: 1500
        });
        correct++;
        $("correct").html(correct);
    }
    else {
        Swal.fire({
          icon: 'error',
          title: 'Wrong',
          text: 'The answer is '+ans,
          showConfirmButton: false,
          timer: 1500
        });
        wrong++;
        $("wrong").html(wrong);
    } 
    $("answer").val('');
    count++;
    total++;
    $("no").html(count);
    $("total").html(total);
    clearInterval(t);
    width = 220;
    bar.style.width = '200px';
    quiz();
}

function ins(num) {
    let chk = $("answer").val().includes(".");
    if ($("answer").val() != '' && num == '-' || num == "." && chk)
    {
    }
    
    else {
      $("answer").val($("answer").val() + num);
      if (mode==1) {
          if ($("answer").val() ==ans)
              check();
      }
    }      
}
function timeCheck() {
    let bar = document.getElementById("bar");
    if(width == 0) {
        clearInterval(t);
        Swal.fire({
          icon: 'warning',
          title: 'Timeout',
          text: 'The answer is '+ans,
          showConfirmButton: false,
          timer: 1500
        });
        wrong++;
        $("wrong").html(wrong);
    quiz();
    width = 220;
    bar.style.width = '200px';
    }
    else {
        width--;
        bar.style.width = width+'px';
    }
}
$(function() {

    $("res").click(function() {
        $("diff").show();
        $("quizbody").hide();
        count=1, total=0, correct=0, wrong=0, lim=0;
        $("correct").html(correct);
        $("wrong").html(wrong);
        $("total").html(total);
        input.value = "";
        clearInterval(t);
        width = 220;
        bar.style.width = '200px';
    });
    
    $("del").click(function() {
        let txt = $("answer").val();
        txt = txt.slice(0, -1);
        $("answer").val(txt);
    });
   

});