$(document).ready(function () {
  var currentStep = 1;
  var $btnNext = $("#next");
  var $btnBack = $("#back");
  var selectedValue = 0;

  // Hide the "Siguiente" button at startup
  $btnNext.hide();

  // Function to handle clicking on an icon
  function handleIconClick() {
    selectedValue = $(this).data("value");
    var step3QuizContainer = $(this).closest(".question");
    step3QuizContainer.find(".optns").hide();
    step3QuizContainer
      .find(".answer-selected")
      .html($(this).clone())
      .show()
      .data("value", selectedValue)
      .off("click")
      .click(function () {
        // When 'answer-selected' is clicked, hide the "Siguiente" button
        $(this).hide().empty();
        step3QuizContainer.find(".optns").show();
        $btnNext.hide(); // Hide the "Siguiente" button
      });

    // TODO
    if (selectedValue < 4) {
      console.log("muestro1");
      $('[name="step2an2"]').show();
    } else {
      console.log("escondo");
      $('[name="step2an2"]')
        .hide()
        .find('input[type="checkbox"]')
        .prop("checked", false);
        $('[name="step2an3"]')
        .hide()
        .find('input[type="checkbox"]')
        .prop("checked", false);
    }
  }

  // Assign the click event to icons
  $(".opt").click(handleIconClick);

  // Initially hide all 'answers selected'
  $(".answer-selected").hide();

  // Function to check if all questions have been answered
  function checkAllQuestionsAnswered() {
    var allAnswered = true;
    $("#qnr .question").each(function () {
      if ($(this).find(".answer-selected").is(":empty")) {
        allAnswered = false;
        return false;
      }
    });
    return allAnswered;
  }

  // Function to update the status of the "Siguiente" button
  function updateNextButtonState() {
    var isStep2an1Checked =
      $('[name="step2an1"]').find('input[type="checkbox"]:checked').length > 0;
      
    var isStep2an2Checked =
      $('[name="step2an2"]').find('input[type="checkbox"]:checked').length > 0;
    var areOptionsVisible = currentStep === 3 && $(".optns:visible").length > 0;

    if (currentStep === 1) {
      $btnNext.show();
    } else if (currentStep === 2) {
      if ($('input[type="radio"][name="step2brk1y"]:checked').val() === "Si") {
        $btnNext.toggle(isStep2an1Checked && isStep2an2Checked);
      } else if (
        $('input[type="radio"][name="step2brk1y"]:checked').val() === "No"
      ) {
        $btnNext.toggle(isStep2an1Checked);
      } else {
        $btnNext.hide();
      }
    } else if (currentStep === 3) {
      $btnNext.toggle(checkAllQuestionsAnswered() && !areOptionsVisible);
    } else {
      $btnNext.hide();
    }
  }

  $btnNext.click(function () {
    if (currentStep < 3) {
      $(".step" + currentStep).removeClass("active");
      $(".section")
        .eq(currentStep - 1)
        .hide();
      currentStep++;
      $(".step" + currentStep).addClass("active");
      $(".section")
        .eq(currentStep - 1)
        .show();
      if (currentStep > 1) {
        $("#back").show();
      }
    }
    updateNextButtonState();
  });

  //'Click' event for the "Anterior" button
  $btnBack.click(function () {
    if (currentStep > 1) {
      $(".step" + currentStep).removeClass("active");
      $(".section")
        .eq(currentStep - 1)
        .hide();
      currentStep--;
      $(".step" + currentStep).addClass("active");
      $(".section")
        .eq(currentStep - 1)
        .show();
      if (currentStep === 1) {
        $("#back").hide();
      }
    }
    updateNextButtonState();
  });

  // 'change' event for 'step2brk1y' radio buttons
  //$('[name="step2an3"]').prop("checked")
  $('input[type="checkbox"][name="checkAns3"]').change(function () {
    var checkans = $(this).prop("checked")
    var value = $(this).val();
    if (checkans == true){
      $('[name="step2an3"]')
        .show();
    }else{
      $('[name="step2an3"]')
        .hide()
        .find('input[type="checkbox"]')
        .prop("checked", false);
    }
    console.log("Valor: " + value + " - " +checkans)

    updateNextButtonState();
  });

  // Events to update the state of the "Siguiente" button
  $(".section")
    .eq(1)
    .find('input[type="checkbox"], input[type="radio"]')
    .change(updateNextButtonState);
  $("#qnr .opt").click(function () {
    setTimeout(updateNextButtonState, 1);
  });

  // Initialize "Siguiente" button state on page load
  updateNextButtonState();
});
