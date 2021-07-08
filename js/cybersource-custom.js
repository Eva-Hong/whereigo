$(document).ready(function() {
    $("#generic-form-submit").on('submit', function(e) {
        var validator = $(this).validate();
        if (validator.form())
            return true;
        else
            return false;
    });
    if ($("body").hasClass("cyb_alipayintermediate")) {
        var loaded = false;
        setTimeout(function() {
            document.RedirectForm.submit();
            loaded = true;
        }, 1000);
    }
    if ($("body").hasClass("cyb_testfingerprintRedirect")) {
        var url_loc = document.getElementById("URl_redirect").value;
        setTimeout(function() {
            location.href = url_loc
        }, 1000);
    }
    if ($("div").hasClass("payerauth")) {
        document.PAInfoForm.submit();
    }
    if ($("body").hasClass("cyb_payerauthenticationredirect")) {
        document.RedirectForm.submit();
    }
    if ($("body").hasClass("cyb_unitTest_payerauth")) {
        document.RedirectForm.submit();
    }
    if ($("div").hasClass("cyb_unitTest_payerauthsubmit")) {
        document.PAInfoForm.submit();
    }
    if ($("body").hasClass("cyb_sa_redirect")) {
        var url_loc = document.getElementById("redirect_url_sa").value;
        window.top.location.replace(url_loc);
    }
    if ($("div").hasClass("SecureAcceptance_IFRAME")) {
        var url_loc = document.getElementById("sa_iframeURL").value;
        $(".SecureAcceptance_IFRAME").append('<iframe src=' + url_loc + '  name="hss_iframe"  width="78%" height="630px" scrolling="no" />');
    }
    if ($("body").hasClass("sa_iframe_request_form")) {
        document.form_iframe.submit();
    }
    if ($("body").hasClass("cyb_sa_request_form")) {
        document.ePayment.submit();
    }
    $("#entry-mode-pos_unittest select.input-select").change(function() {
        if (this.value == "swiped")
            $("#card-section, #sample-card-section").css("display", "none");
        else if (this.value == "keyed")
            $("#card-section, #sample-card-section").css("display", "block");
    });
    $('.billingAgreementExpressCheckout').click(function(e) {
        e.preventDefault();
        var form = $('<form action="' + Urls.paypalcallback + '" method="post">' +
            '</form>');
        $('body').append(form);
        form.submit();
    });
});