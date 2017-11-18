var gulp = require('gulp')
	, concat = require('gulp-concat')
	, uglify = require('gulp-uglify')
	, usemin = require('gulp-usemin')
	, rimraf = require('gulp-rimraf')
	, sourcemaps = require('gulp-sourcemaps')
	, replace = require('gulp-replace')
	, plumber = require('gulp-plumber')
	, fs = require("fs")

	, fullSdkSrc = [
		"src/core.js",
		"src/promise.js",
		"src/net.js",
		"src/util.js",
		"src/AndroidPay.js",
		"src/PublicKeyResponse.js",
		"src/PaymentProductPublicKeyResponse.js",
		"src/C2SCommunicatorConfiguration.js",
		"src/IinDetailsResponse.js",
		"src/C2SCommunicator.js",
		"src/LabelTemplateElement.js",
		"src/Attribute.js",
		"src/AccountOnFileDisplayHints.js",
		"src/AccountOnFile.js",
		"src/PaymentProductDisplayHints.js",
		"src/BasicPaymentProduct.js",
		"src/BasicPaymentProductGroup.js",
		"src/MaskedString.js",
		"src/MaskingUtil.js",
		"src/ValidationRuleLuhn.js",
		"src/ValidationRuleExpirationDate.js",
		"src/ValidationRuleFixedList.js",
		"src/ValidationRuleLength.js",
		"src/ValidationRuleRange.js",
		"src/ValidationRuleRegularExpression.js",
		"src/ValidationRuleEmailAddress.js",
		"src/ValidationRuleBoletoBancarioRequiredness.js",
		"src/ValidationRuleFactory.js",
		"src/DataRestrictions.js",
		"src/ValueMappingElement.js",
		"src/FormElement.js",
		"src/Tooltip.js",
		"src/PaymentProductFieldDisplayHints.js",
		"src/PaymentProductField.js",
		"src/PaymentProduct.js",
		"src/PaymentProductGroup.js",
		"src/BasicPaymentProducts.js",
		"src/BasicPaymentProductGroups.js",
		"src/BasicPaymentItems.js",
		"src/PaymentRequest.js",
		"src/C2SPaymentProductContext.js",
		"src/JOSEEncryptor.js",
		"src/Encryptor.js",
		"src/session.js"
	]

	, sdkSrcNoEncryption = [
		"src/core.js",
		"src/promise.js",
		"src/net.js",
		"src/util.js",
		"src/AndroidPay.js",
		"src/PublicKeyResponse.js",
		"src/PaymentProductPublicKeyResponse.js",
		"src/C2SCommunicatorConfiguration.js",
		"src/IinDetailsResponse.js",
		"src/C2SCommunicator.js",
		"src/LabelTemplateElement.js",
		"src/Attribute.js",
		"src/AccountOnFileDisplayHints.js",
		"src/AccountOnFile.js",
		"src/PaymentProductDisplayHints.js",
		"src/BasicPaymentProduct.js",
		"src/BasicPaymentProductGroup.js",
		"src/MaskedString.js",
		"src/MaskingUtil.js",
		"src/ValidationRuleLuhn.js",
		"src/ValidationRuleExpirationDate.js",
		"src/ValidationRuleFixedList.js",
		"src/ValidationRuleLength.js",
		"src/ValidationRuleRange.js",
		"src/ValidationRuleRegularExpression.js",
		"src/ValidationRuleEmailAddress.js",
		"src/ValidationRuleBoletoBancarioRequiredness.js",
		"src/ValidationRuleFactory.js",
		"src/DataRestrictions.js",
		"src/ValueMappingElement.js",
		"src/FormElement.js",
		"src/Tooltip.js",
		"src/PaymentProductFieldDisplayHints.js",
		"src/PaymentProductField.js",
		"src/PaymentProduct.js",
		"src/PaymentProductGroup.js",
		"src/BasicPaymentProducts.js",
		"src/BasicPaymentProductGroups.js",
		"src/BasicPaymentItems.js",
		"src/PaymentRequest.js",
		"src/C2SPaymentProductContext.js",
		"src/JOSEEncryptor.js",
		"src/Encryptor.js",
		"src/session.js"
	];

var VERSION = fs.readFileSync("VERSION.TXT", "utf8");

gulp.task('createFullSdk', function () {
	gulp.src(fullSdkSrc)
		.pipe(sourcemaps.init())
		.pipe(concat('connectsdk.js'))
		.pipe(replace(/\$\{version\}/g, VERSION))
		.pipe(gulp.dest('./dist/'))
		.pipe(concat('connectsdk.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('createSdkNoEncryption', function () {
	gulp.src(sdkSrcNoEncryption)
		.pipe(sourcemaps.init())
		.pipe(concat('connectsdk.noEncrypt.js'))
		.pipe(replace(/\$\{version\}/g, VERSION))
		.pipe(gulp.dest('./dist/'))
		.pipe(concat('connectsdk.noEncrypt.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/'));
});

// clean folder
gulp.task('clean', function (cb) {
	return gulp.src('./dist', { read: false }).pipe(plumber()).pipe(rimraf());
});

gulp.task('build', ['createFullSdk', 'createSdkNoEncryption']);

gulp.task('default', function () {
    console.error('no default task! use gulp --tasks');
});
