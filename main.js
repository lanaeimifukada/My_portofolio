$(function(){
  const words = ["CYBER", "404", "ERROR", "NOT FOUND"];
  const $opening = $("#opening");
  let wordIndex = 0;
  let letterIndex = 0;
  let deleting = false;
  const colors = ["#00ffff","#ff33cc","#00ff88","#a44dff"];

  // buat cursor
  $opening.after('<span class="cursor"></span>');

  function typeEffect(){
    const currentWord = words[wordIndex];
    const currentColor = colors[wordIndex % colors.length];
    $opening.css({
      color: currentColor,
      textShadow: `0 0 10px ${currentColor}, 0 0 20px ${currentColor}`
    });

    if(!deleting){
      $opening.text(currentWord.substring(0, letterIndex+1));
      letterIndex++;
      if(letterIndex === currentWord.length){
        deleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    }else{
      $opening.text(currentWord.substring(0, letterIndex-1));
      letterIndex--;
      if(letterIndex === 0){
        deleting = false;
        wordIndex = (wordIndex+1) % words.length;
      }
    }
    setTimeout(typeEffect, deleting ? 80 : 140);
  }
  typeEffect();

  // tahun otomatis
  $("#year").text(new Date().getFullYear());

  // smooth scroll
  $(".cta").on("click", function(e){
    e.preventDefault();
    const target = $(this).attr("href");
    if($(target).length){
      $("html,body").animate({scrollTop: $(target).offset().top - 20}, 700);
    }
  });
});
