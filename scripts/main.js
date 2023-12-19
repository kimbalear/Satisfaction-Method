$(document).ready(function () {
  var currentStep = 1;
  var $btnNext = $("#next");
  var $btnBack = $("#back");
  var selectedValue = 0;
  var isEfectosSecundariosSelected;

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
      $('[name="step2an2"]').show();
    } else {
      $('[name="step2an2"]')
        .hide()
        .find('input[type="radio"]')
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
      $('input[type="radio"][name="step2cks1"]:checked').length > 0;
    var isStep2an2Checked = $('input[type="radio"][name="step2cks2"]').is(
      ":checked"
    );

    var isStep2an3Checked =
      $('[name="step2an3"]').find('input[type="checkbox"]:checked').length > 0;
    var areOptionsVisible = currentStep === 3 && $(".optns:visible").length > 0;

    if (currentStep === 1) {
      $btnNext.show();
    }
    if (currentStep === 2) {
      $btnNext.hide();
      if (selectedValue > 3 && isStep2an1Checked) {
        console.log("contento y al menos un check");
        $('[name="Effects"]').hide();
        $('[name="NotEffects"]').hide();
        $('[name="happy"]').show();
        $btnNext.show();
      }

      if (selectedValue < 4) {
        if (isEfectosSecundariosSelected) {
          console.log("Efectos secundarios está seleccionado.");
          if (isStep2an3Checked) {
            $btnNext.show();
            $('[name="happy"]').hide();
            $('[name="NotEffects"]').hide();
            $('[name="Effects"]').show();
          } else {
            $btnNext.hide();
            $('[name="happy"]').hide();
            $('[name="NotEffects"]').hide();
            $('[name="Effects"]').hide();
          }
        } else {
          console.log("Efectos secundarios no está seleccionado");
          if (isStep2an1Checked && isStep2an2Checked) {
            console.log("Efectos secundarios no está seleccionado.#!");
            $btnNext.show();
            $('[name="happy"]').hide();
            $('[name="Effects"]').hide();
            $('[name="NotEffects"]').show();
          }
        }
      }
    }
    if (currentStep === 3) {
      $btnNext.toggle(checkAllQuestionsAnswered() && !areOptionsVisible);
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

  $('input[type="radio"][name="step2cks2"]').on("change", function () {
    isEfectosSecundariosSelected = $(
      'input[type="radio"][name="step2cks2"][value="efectsec"]'
    ).is(":checked");

    if (isEfectosSecundariosSelected) {
      $('[name="step2an3"]').show();
      $('.wrapper').animate({ scrollTop: $(document).height() }, "slow");
    } else {
      $('[name="step2an3"]')
        .hide()
        .find('input[type="checkbox"]')
        .prop("checked", false);
    }
    updateNextButtonState();
  });

  $('[name="step2an1"] input[type="checkbox"]').on("change", function () {
    isStep2an1Checked =
      $('[name="step2an1"]').find('input[type="checkbox"]:checked').length > 0;
    console.log("Check isStep2an1Checked: " + isStep2an1Checked);
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
