/* ================= STORAGE (safe wrapper: localStorage with in-memory fallback) ================= */
const Store = {
    mem: {},
    get(key, fallback) {
        try {
            const v = localStorage.getItem(key);
            return v !== null ? JSON.parse(v) : fallback;
        } catch (e) { return (key in this.mem) ? this.mem[key] : fallback; }
    },
    set(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); }
        catch (e) { this.mem[key] = value; }
    }
};

/* ================= THEME (dark mode) ================= */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    Store.set('kc_theme', next);
}
(function initTheme() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(Store.get('kc_theme', prefersDark ? 'dark' : 'light'));
})();

/* ================= I18N ================= */
const STR = {
    en: {
        homeTitle: "Price Board", homeSubtitle: "Today's fair buying rates from authorized recyclers",
        priceDisclaimer: "Demo rates shown for prototype. Live version pulls current rates from the recycler network dataset. \u00A9 2026 KabadiSetu. Bridging Waste Collectors and Recyclers for a Sustsainable Future.",
        navHome: "Home", navLots: "My Lots", navNew: "New Lot", navLedger: "Ledger", navMore: "More",
        newLotTitle: "Create New Lot", stepCategory: "What did you collect?", stepPhoto: "Add a photo",
        photoHint: "A clear photo builds trust with the recycler", choosePhoto: "Take / Choose Photo",
        back: "Back", next: "Next", stepWeight: "How much does it weigh?", estValueLabel: "Estimated value",
        stepConfirm: "Confirm your lot", saveLot: "Save Lot",
        gettingLocation: "📍 Getting location…", locationApprox: "📍 Approx. location used (GPS unavailable)", locationCaptured: "📍 Location captured",
        toastLotSaved: "Lot saved! Ready to find a recycler.",
        myLotsTitle: "My Lots", myLotsSub: "Track every lot from collection to payment",
        noLotsYet: "No lots yet. Tap + to create your first lot.",
        statusDraft: "Draft", statusQuoted: "Quoted", statusMatched: "Matched", statusHanded: "Handed Over", statusCompleted: "Completed",
        findRecyclers: "Find Recyclers", viewRecord: "View Handover Record",
        recyclerMatchTitle: "Recyclers for this lot", authorizedBadge: "✓ Authorized", notAuthorizedBadge: "Not Authorized",
        notRecommendedHead: "⚠ Not Recommended", notRecommendedNote: "Not authorized under E-Waste Rules 2022. Materials may not be safely processed.",
        distanceAway: "km away", offeredValueLabel: "Offered value", pickupYes: "Pickup available", pickupNo: "Drop-off only",
        selectHandover: "Select & Handover", noRecyclers: "No recyclers currently accept this material nearby.",
        handoverTitle: "Handover Confirmed", refLabel: "Reference ID", timeLabel: "Time", gpsLabel: "Location",
        recyclerLabel: "Recycler", valueLabel: "Value", shareWhatsapp: "Share via WhatsApp", markCashReceived: "Mark Cash Received",
        paymentPending: "Payment Pending", paymentPaid: "Paid", done: "Done",
        ledgerTitle: "Earnings Ledger", totalEarnings: "Total Earned", pendingDues: "Pending Dues",
        pendingPayments: "Pending Payments", transactionHistory: "Transaction History", noTransactions: "No transactions yet.",
        moreTitle: "More", languageLabel: "Choose your language",
        syncTitle: "Offline Sync", syncNow: "Sync Now",
        safetyTitle: "Safety Guidance", listen: "Listen",
        aboutTitle: "About KabadiSetu",
        aboutBody: "<b>KabadiSetu</b><br> A smart digital platform for efficient scrap collection and responsible recycling that connects waste collectors(kabadiwalas) with authorized recyclers, making scrap trading more transparent, efficient and accessible. By enabling fair pricing, verified transactions, and streamlined communication, KabadiSetu helps strengthen the recycling ecosystem while promoting sustainable waste management and a cleaner environment!",
        toastSynced: "All lots synced.", toastNoOffline: "You're offline — will sync when connected.",
        weightLabel: "Weight",
        cat_crt: "CRT Monitor/TV", cat_lcd: "LCD Panel", cat_pcb: "Circuit Board (PCB)", cat_cable: "Cables",
        cat_battery: "Batteries", cat_motor: "Motor / Magnet", cat_plastic: "Mixed Plastic",
        roleKabadiwala: "Kabadiwala", roleRecycler: "Recycler", loginTitle: "Log in to KabadiSetu", loginSub: "Collect, sell and track your scrap",
        mobileLabel: "Mobile number", sendOtp: "Send OTP", changeNumber: "Change number", verifyOtp: "Verify & Continue", resendOtp: "Resend OTP", otpResent: "OTP resent",
        otpSent: "OTP sent to +91 ", nameTitle: "What should we call you?", nameSub: "This name will greet you on your home screen",
        nameLabel: "Your name", namePlaceholder: "e.g. Raju Kumar", continueBtn: "Continue",
        welcomeBack: "Welcome back", whatToDo: "What do you want to do today?",
        invalidPhone: "Enter a valid 10-digit number", wrongOtp: "Enter all 4 digits",
        aiScanning: "AI is analyzing your photo…",
        aiMatch: "AI check passed — this photo looks like",
        aiMismatch: "AI thinks this looks more like",
        aiMismatchNote: "You selected a different category. Double check before saving, or fix it below.",
        aiFixBtn: "Use AI suggestion instead",
        aiSwitched: "Category updated from photo",
        qrCaption: "Scan this code to view the full transaction record — material, weight, amount, date/time, recycler and kabadiwala details.",
        near: "Near",
        safety5t: "Wear Protective Gear", safety5d: "Always wear thick gloves, closed shoes and a mask when handling scrap. Wash your hands well after every sorting session, and never eat or drink while sorting e-waste.",
        safety6t: "Store & Transport Safely", safety6d: "Keep scrap dry, away from children and out of direct sun. Stack CRTs and glass upright so they can't fall, and tie down loose loads before moving them so nothing spills on the road.",
        safety1t: "Batteries", safety1d: "Don't puncture, crush or short-circuit batteries — they can spark a fire. Keep them away from heat and flames, store them separately from metals in a dry, ventilated spot, and hand over swollen or leaking cells to the recycler immediately.",
        safety2t: "CRT Monitors/TVs", safety2d: "Old CRT screens contain leaded glass and phosphor dust that is harmful if inhaled or touched. Always wear gloves and glasses, carry them upright with both hands, and never break, drill or hammer the tube open.",
        safety3t: "No Open Burning", safety3d: "Burning cable insulation to expose copper releases toxic fumes that damage your lungs and pollute the air for everyone nearby. Sell insulated cables as-is — authorized recyclers have safe machines to strip them.",
        safety4t: "No Acid Treatment", safety4d: "Never use acid to leach gold or other metals from circuit boards at home — the fumes and runoff cause severe skin, lung and eye damage and poison local water. Hand over PCBs whole and intact to an authorized recycler only.",
    },
    hi: {
        homeTitle: "भाव बोर्ड", homeSubtitle: "आज के सही दाम, अधिकृत रिसाइक्लर से",
        priceDisclaimer: "यह प्रोटोटाइप के लिए नमूना दाम हैं। पूरे संस्करण में असली दाम रिसाइक्लर नेटवर्क से आएंगे। \u00A9 2026 KabadiSetu. Bridging Waste Collectors and Recyclers for a Sustsainable Future.",
        navHome: "होम", navLots: "मेरे लॉट", navNew: "नया लॉट", navLedger: "कमाई", navMore: "और",
        newLotTitle: "नया लॉट बनाएं", stepCategory: "आपने क्या इकट्ठा किया?", stepPhoto: "फोटो जोड़ें",
        photoHint: "साफ फोटो से रिसाइक्लर का भरोसा बढ़ता है", choosePhoto: "फोटो लें / चुनें",
        back: "पीछे", next: "आगे", stepWeight: "वज़न कितना है?", estValueLabel: "अनुमानित कीमत",
        stepConfirm: "लॉट की पुष्टि करें", saveLot: "लॉट सेव करें",
        gettingLocation: "📍 लोकेशन ली जा रही है…", locationApprox: "📍 अनुमानित लोकेशन (GPS उपलब्ध नहीं)", locationCaptured: "📍 लोकेशन दर्ज हुई",
        toastLotSaved: "लॉट सेव हो गया! अब रिसाइक्लर ढूंढें।",
        myLotsTitle: "मेरे लॉट", myLotsSub: "हर लॉट को कलेक्शन से पेमेंट तक ट्रैक करें",
        noLotsYet: "अभी कोई लॉट नहीं। + दबाकर पहला लॉट बनाएं।",
        statusDraft: "ड्राफ्ट", statusQuoted: "कोटेड", statusMatched: "मैच हुआ", statusHanded: "सौंपा गया", statusCompleted: "पूरा हुआ",
        findRecyclers: "रिसाइक्लर ढूंढें", viewRecord: "हैंडओवर रिकॉर्ड देखें",
        recyclerMatchTitle: "इस लॉट के लिए रिसाइक्लर", authorizedBadge: "✓ अधिकृत", notAuthorizedBadge: "अनधिकृत",
        notRecommendedHead: "⚠ सुझाया नहीं गया", notRecommendedNote: "E-Waste नियम 2022 के तहत अधिकृत नहीं है। सामान सुरक्षित तरीके से प्रोसेस नहीं हो सकता।",
        distanceAway: "किमी दूर", offeredValueLabel: "दी गई कीमत", pickupYes: "पिकअप उपलब्ध", pickupNo: "सिर्फ ड्रॉप-ऑफ",
        selectHandover: "चुनें और सौंपें", noRecyclers: "पास में इस सामान के लिए कोई रिसाइक्लर नहीं है।",
        handoverTitle: "हैंडओवर पक्का हुआ", refLabel: "रेफरेंस आईडी", timeLabel: "समय", gpsLabel: "लोकेशन",
        recyclerLabel: "रिसाइक्लर", valueLabel: "कीमत", shareWhatsapp: "व्हाट्सएप पर भेजें", markCashReceived: "कैश मिला — चिन्हित करें",
        paymentPending: "पेमेंट बाकी", paymentPaid: "पेमेंट हो गई", done: "हो गया",
        ledgerTitle: "कमाई का हिसाब", totalEarnings: "कुल कमाई", pendingDues: "बाकी पैसा",
        pendingPayments: "बाकी पेमेंट", transactionHistory: "लेन-देन इतिहास", noTransactions: "अभी कोई लेन-देन नहीं।",
        moreTitle: "और", languageLabel: "अपनी भाषा चुनें",
        syncTitle: "ऑफलाइन सिंक", syncNow: "अभी सिंक करें",
        safetyTitle: "सुरक्षा सलाह", listen: "सुनें",
        aboutTitle: "इस प्रोटोटाइप के बारे में",
        aboutBody: "<b>KabadiSetu</b> यह स्क्रैप इकट्ठा करने और ज़िम्मेदारी से रीसाइक्लिंग करने के लिए एक स्मार्ट डिजिटल प्लेटफ़ॉर्म है। यह कचरा इकट्ठा करने वालों (कबाड़ीवालों) को अधिकृत रीसाइक्लर से जोड़ता है, जिससे स्क्रैप का व्यापार ज़्यादा पारदर्शी, कुशल और आसान हो जाता है। सही कीमत, वेरिफ़ाइड ट्रांज़ैक्शन और बेहतर बातचीत की सुविधा देकर, KabadiSetu रीसाइक्लिंग इकोसिस्टम को मज़बूत बनाने के साथ-साथ सस्टेनेबल वेस्ट मैनेजमेंट और साफ़-सुथरे पर्यावरण को बढ़ावा देता है!",
        toastSynced: "सभी लॉट सिंक हो गए।", toastNoOffline: "आप ऑफलाइन हैं — कनेक्ट होते ही सिंक होगा।",
        weightLabel: "वज़न",
        cat_crt: "पुराना टीवी/मॉनिटर", cat_lcd: "LCD पैनल", cat_pcb: "सर्किट बोर्ड", cat_cable: "तार-केबल",
        cat_battery: "बैटरी", cat_motor: "मोटर/मैग्नेट", cat_plastic: "मिला-जुला प्लास्टिक",
        safety1t: "बैटरी", safety1d: "बैटरी को तोड़ें, दबाएं या शॉर्ट-सर्किट न करें — इससे आग लग सकती है। गर्मी और आग से दूर रखें, धातुओं से अलग सूखी और हवादार जगह पर रखें, और फूली या लीक हो रही बैटरी तुरंत रिसाइक्लर को सौंप दें।",
        safety2t: "पुराना टीवी/मॉनिटर (CRT)", safety2d: "पुराने CRT स्क्रीन में लेड युक्त शीशा और फॉस्फर धूल होती है जो सांस या छूने से नुकसानदायक है। हमेशा दस्ताने और चश्मा पहनें, दोनों हाथों से सीधा उठाएं, और ट्यूब को कभी न तोड़ें, न ड्रिल करें।",
        safety3t: "जलाएं नहीं", safety3d: "तांबा निकालने के लिए तार की परत जलाने से ज़हरीला धुआं निकलता है जो फेफड़ों को नुकसान पहुंचाता है और आस-पास के लोगों के लिए हवा प्रदूषित करता है। तार को वैसे ही बेचें — अधिकृत रिसाइक्लर के पास इसे सुरक्षित तरीके से उतारने की मशीन होती है।",
        safety4t: "एसिड का इस्तेमाल न करें", safety4d: "घर पर सर्किट बोर्ड से सोना या अन्य धातु निकालने के लिए कभी एसिड का उपयोग न करें — इसका धुआं और बहाव त्वचा, फेफड़ों और आंखों को गंभीर नुकसान पहुंचाता है और पानी को ज़हरीला बनाता है। बोर्ड पूरा और बिना तोड़े सिर्फ अधिकृत रिसाइक्लर को सौंपें।",
        aiScanning: "AI आपकी फोटो जांच रहा है…",
        aiMatch: "AI जांच सफल — यह फोटो ऐसी दिखती है",
        aiMismatch: "AI को लगता है कि यह ज़्यादा ऐसी दिखती है",
        aiMismatchNote: "आपने अलग श्रेणी चुनी है। सेव करने से पहले दोबारा जांच लें, या नीचे ठीक करें।",
        aiFixBtn: "AI सुझाव अपनाएं",
        aiSwitched: "फोटो के आधार पर श्रेणी बदली गई",
        qrCaption: "पूरा लेन-देन रिकॉर्ड देखने के लिए यह कोड स्कैन करें — सामान, वज़न, कीमत, तारीख़/समय, रिसाइक्लर और कबाड़ीवाला की जानकारी।",
        near: "पास में",
        safety5t: "सुरक्षा उपकरण पहनें", safety5d: "कबाड़ संभालते समय हमेशा मोटे दस्ताने, बंद जूते और मास्क पहनें। हर बार छांटने के बाद हाथ अच्छे से धोएं, और ई-वेस्ट छांटते समय कभी कुछ खाएं-पिएं नहीं।",
        safety6t: "सुरक्षित भंडारण और ढुलाई", safety6d: "कबाड़ को सूखा, बच्चों से दूर और सीधी धूप से बचाकर रखें। CRT और कांच को सीधा खड़ा करके रखें ताकि वे गिरें नहीं, और ले जाते समय ढीले सामान को अच्छे से बांधें ताकि रास्ते में कुछ न गिरे।",
        roleKabadiwala: "कबाड़ीवाला", roleRecycler: "रीसाइक्लर", loginTitle: "कबाड़ीसेतु में लॉगिन करें", loginSub: "कबाड़ इकट्ठा करें, बेचें और ट्रैक करें",
        mobileLabel: "मोबाइल नंबर", sendOtp: "OTP भेजें", changeNumber: "नंबर बदलें", verifyOtp: "सत्यापित करें और जारी रखें", resendOtp: "OTP फिर भेजें", otpResent: "OTP फिर भेजा गया",
        otpSent: "OTP भेजा गया +91 ", nameTitle: "आपको क्या कहकर बुलाएं?", nameSub: "यह नाम आपके होम स्क्रीन पर दिखेगा",
        nameLabel: "आपका नाम", namePlaceholder: "जैसे राजू कुमार", continueBtn: "जारी रखें",
        welcomeBack: "वापसी पर स्वागत है", whatToDo: "आज आप क्या करना चाहते हैं?",
        invalidPhone: "सही 10 अंकों का नंबर डालें", wrongOtp: "सभी 4 अंक भरें"
    },
    mr: {
        homeTitle: "भाव फलक", homeSubtitle: "आजचे योग्य भाव, अधिकृत रिसायकलरकडून",
        priceDisclaimer: "हे प्रोटोटाइपसाठी नमुना दर आहेत. पूर्ण आवृत्तीत खरे दर रिसायकलर नेटवर्कमधून येतील. \u00A9 2026 KabadiSetu. Bridging Waste Collectors and Recyclers for a Sustsainable Future",
        navHome: "होम", navLots: "माझे लॉट", navNew: "नवीन लॉट", navLedger: "कमाई", navMore: "अधिक",
        newLotTitle: "नवीन लॉट तयार करा", stepCategory: "तुम्ही काय गोळा केले?", stepPhoto: "फोटो जोडा",
        photoHint: "स्पष्ट फोटोमुळे रिसायकलरचा विश्वास वाढतो", choosePhoto: "फोटो काढा / निवडा",
        back: "मागे", next: "पुढे", stepWeight: "वजन किती आहे?", estValueLabel: "अंदाजे किंमत",
        stepConfirm: "लॉटची खात्री करा", saveLot: "लॉट सेव्ह करा",
        gettingLocation: "📍 लोकेशन घेतले जात आहे…", locationApprox: "📍 अंदाजे लोकेशन (GPS उपलब्ध नाही)", locationCaptured: "📍 लोकेशन नोंदवले",
        toastLotSaved: "लॉट सेव्ह झाला! आता रिसायकलर शोधा.",
        myLotsTitle: "माझे लॉट", myLotsSub: "प्रत्येक लॉट संकलनापासून पेमेंटपर्यंत ट्रॅक करा",
        noLotsYet: "अजून लॉट नाही. + दाबून पहिला लॉट तयार करा.",
        statusDraft: "ड्राफ्ट", statusQuoted: "कोट झाले", statusMatched: "जुळले", statusHanded: "हस्तांतरित", statusCompleted: "पूर्ण",
        findRecyclers: "रिसायकलर शोधा", viewRecord: "हस्तांतरण रेकॉर्ड पहा",
        recyclerMatchTitle: "या लॉटसाठी रिसायकलर", authorizedBadge: "✓ अधिकृत", notAuthorizedBadge: "अनधिकृत",
        notRecommendedHead: "⚠ शिफारस नाही", notRecommendedNote: "E-Waste नियम 2022 अंतर्गत अधिकृत नाही. साहित्य सुरक्षितपणे प्रक्रिया होणार नाही.",
        distanceAway: "किमी अंतरावर", offeredValueLabel: "दिलेली किंमत", pickupYes: "पिकअप उपलब्ध", pickupNo: "फक्त ड्रॉप-ऑफ",
        selectHandover: "निवडा आणि हस्तांतर करा", noRecyclers: "जवळपास या साहित्यासाठी रिसायकलर नाही.",
        handoverTitle: "हस्तांतरण पक्के झाले", refLabel: "संदर्भ आयडी", timeLabel: "वेळ", gpsLabel: "लोकेशन",
        recyclerLabel: "रिसायकलर", valueLabel: "किंमत", shareWhatsapp: "व्हॉट्सअ‍ॅपवर पाठवा", markCashReceived: "रोख मिळाली — नोंद करा",
        paymentPending: "पेमेंट बाकी", paymentPaid: "पेमेंट झाले", done: "झाले",
        ledgerTitle: "कमाईचा हिशोब", totalEarnings: "एकूण कमाई", pendingDues: "बाकी रक्कम",
        pendingPayments: "बाकी पेमेंट", transactionHistory: "व्यवहार इतिहास", noTransactions: "अजून व्यवहार नाही.",
        moreTitle: "अधिक", languageLabel: "तुमची भाषा निवडा",
        syncTitle: "ऑफलाइन सिंक", syncNow: "आता सिंक करा",
        safetyTitle: "सुरक्षा मार्गदर्शन", listen: "ऐका",
        aboutTitle: "या प्रोटोटाइपबद्दल",
        aboutBody: "<b>KabadiSetu</b> कार्यक्षम भंगार संकलन आणि जबाबदार पुनर्वापरासाठी एक स्मार्ट डिजिटल प्लॅटफॉर्म, जो कचरा गोळा करणाऱ्यांना (कबाडीवाल्यांना) अधिकृत पुनर्वापर करणाऱ्यांशी जोडतो, ज्यामुळे भंगार व्यापार अधिक पारदर्शक, कार्यक्षम आणि सुलभ होतो. योग्य दर, सत्यापित व्यवहार आणि सुव्यवस्थित संवाद सक्षम करून, कबाडीसेतू पुनर्वापर परिसंस्थेला बळकट करण्यास मदत करते, तसेच शाश्वत कचरा व्यवस्थापन आणि स्वच्छ पर्यावरणाला प्रोत्साहन देते!",
        toastSynced: "सर्व लॉट सिंक झाले.", toastNoOffline: "तुम्ही ऑफलाइन आहात — कनेक्ट झाल्यावर सिंक होईल.",
        weightLabel: "वजन",
        cat_crt: "जुना टीव्ही/मॉनिटर", cat_lcd: "LCD पॅनल", cat_pcb: "सर्किट बोर्ड", cat_cable: "तार-केबल",
        cat_battery: "बॅटरी", cat_motor: "मोटर/मॅग्नेट", cat_plastic: "मिश्र प्लास्टिक",
        safety1t: "बॅटरी", safety1d: "बॅटरी फोडू नका, दाबू नका किंवा शॉर्ट-सर्किट करू नका — त्यामुळे आग लागू शकते. उष्णता व आगीपासून दूर, धातूंपासून वेगळी, कोरड्या व हवेशीर जागी ठेवा, आणि फुगलेली किंवा गळणारी बॅटरी लगेच रिसायकलरकडे द्या.",
        safety2t: "जुना टीव्ही/मॉनिटर (CRT)", safety2d: "जुन्या CRT स्क्रीनमध्ये शिसेयुक्त काच आणि फॉस्फर धूळ असते जी श्वासाने किंवा स्पर्शाने हानिकारक आहे. नेहमी हातमोजे व गॉगल घाला, दोन्ही हातांनी सरळ उचला, आणि ट्यूब कधीही फोडू किंवा ड्रिल करू नका.",
        safety3t: "जाळू नका", safety3d: "तांबे मिळवण्यासाठी तारेचे आवरण जाळल्याने विषारी धूर बाहेर पडतो जो फुफ्फुसांना हानी पोहोचवतो आणि आजूबाजूची हवा प्रदूषित करतो. तार जशी आहे तशी विका — अधिकृत रिसायकलरकडे ती सुरक्षितपणे उतरवण्याचे यंत्र असते.",
        safety4t: "आम्ल वापरू नका", safety4d: "घरी सर्किट बोर्डमधून सोने किंवा इतर धातू काढण्यासाठी कधीही आम्ल वापरू नका — त्याची वाफ आणि सांडपाणी त्वचा, फुफ्फुसे व डोळ्यांना गंभीर हानी पोहोचवते आणि पाणी विषारी बनवते. बोर्ड जसाच्या तसा फक्त अधिकृत रिसायकलरला द्या.",
        aiScanning: "AI तुमचा फोटो तपासत आहे…",
        aiMatch: "AI तपासणी यशस्वी — हा फोटो असा दिसतो",
        aiMismatch: "AI ला वाटते की हा फोटो जास्त असा दिसतो",
        aiMismatchNote: "तुम्ही वेगळी श्रेणी निवडली आहे. सेव्ह करण्यापूर्वी पुन्हा तपासा, किंवा खाली दुरुस्त करा.",
        aiFixBtn: "AI सूचना वापरा",
        aiSwitched: "फोटोच्या आधारे श्रेणी बदलली",
        qrCaption: "संपूर्ण व्यवहार तपशील पाहण्यासाठी हा कोड स्कॅन करा — साहित्य, वजन, रक्कम, तारीख/वेळ, रिसायकलर आणि कबाडीवाला माहिती.",
        near: "जवळ",
        safety5t: "सुरक्षा साधने वापरा", safety5d: "भंगार हाताळताना नेहमी जाड हातमोजे, बंद बूट आणि मास्क घाला. प्रत्येक वेळी वर्गीकरणानंतर हात नीट धुवा, आणि ई-वेस्ट वर्गीकरण करताना कधीही खाऊ-पिऊ नका.",
        safety6t: "सुरक्षित साठवण आणि वाहतूक", safety6d: "भंगार कोरडे, मुलांपासून दूर आणि थेट उन्हापासून वाचवून ठेवा. CRT आणि काच सरळ उभे ठेवा जेणेकरून ते पडणार नाहीत, आणि वाहतूक करताना सैल सामान नीट बांधा जेणेकरून रस्त्यात काही सांडणार नाही.",
        roleKabadiwala: "कबाडीवाला", roleRecycler: "रिसायकलर", loginTitle: "कबाडीसेतू मध्ये लॉगिन करा", loginSub: "भंगार गोळा करा, विका आणि ट्रॅक करा",
        mobileLabel: "मोबाईल नंबर", sendOtp: "OTP पाठवा", changeNumber: "नंबर बदला", verifyOtp: "पडताळणी करा आणि पुढे जा", resendOtp: "OTP पुन्हा पाठवा", otpResent: "OTP पुन्हा पाठवला",
        otpSent: "OTP पाठवला +91 ", nameTitle: "तुम्हाला काय म्हणून हाक मारू?", nameSub: "हे नाव तुमच्या होम स्क्रीनवर दिसेल",
        nameLabel: "तुमचे नाव", namePlaceholder: "उदा. राजू कुमार", continueBtn: "पुढे जा",
        welcomeBack: "पुन्हा स्वागत आहे", whatToDo: "आज तुम्हाला काय करायचे आहे?",
        invalidPhone: "वैध 10-अंकी नंबर टाका", wrongOtp: "सर्व 4 अंक भरा"
    }
};
let LANG = Store.get('kc_lang', null);
function t(key) { const d = STR[LANG || 'en']; return (d && d[key] !== undefined) ? d[key] : (STR.en[key] || key); }

/* ================= DATA ================= */
const CATS = [
    { key: 'crt', em: '📺' }, { key: 'lcd', em: '🖥️' }, { key: 'pcb', em: '🔧' }, { key: 'cable', em: '🔌' },
    { key: 'battery', em: '🔋' }, { key: 'motor', em: '⚙️' }, { key: 'plastic', em: '♻️' }
];
const PRICES = {
    crt: { rate: 8, hist: [7, 7.5, 7.5, 8, 8, 7.5, 8] },
    lcd: { rate: 15, hist: [14, 14, 15, 15, 14.5, 15, 15] },
    pcb: { rate: 180, hist: [165, 170, 168, 175, 178, 182, 180] },
    cable: { rate: 35, hist: [32, 33, 34, 33, 35, 36, 35] },
    battery: { rate: 25, hist: [22, 23, 24, 24, 25, 25, 25] },
    motor: { rate: 45, hist: [40, 41, 43, 44, 45, 46, 45] },
    plastic: { rate: 12, hist: [11, 11.5, 12, 12, 11.5, 12, 12] }
};
const RECYCLERS = [
    { id: 'r6', name: 'Bharat Recyclers', lat: 26.2442, lng: 80.1164, authorized: true, materials: 'all', mult: 1.05, pickup: true },
    { id: 'r1', name: 'GreenLoop E-Waste Recyclers', lat: 26.4780, lng: 80.3462, authorized: false, materials: 'all', mult: 1.05, pickup: true },
    { id: 'r2', name: 'Bhoomi Metal Recovery', lat: 26.5123, lng: 80.2890, authorized: true, materials: ['pcb', 'motor', 'cable'], mult: 1.10, pickup: false },
    { id: 'r3', name: 'Suraksha Recyclers Pvt Ltd', lat: 26.5464, lng: 80.4879, authorized: true, materials: ['crt', 'lcd', 'plastic'], mult: 0.98, pickup: true },
    { id: 'r4', name: 'Nav Disha Aggregators', lat: 26.4200, lng: 80.3600, authorized: false, materials: 'all', mult: 1.20, pickup: true },
    { id: 'r5', name: 'EcoCircle Processing Unit', lat: 26.8467, lng: 80.9462, authorized: true, materials: ['battery', 'motor', 'pcb'], mult: 1.15, pickup: false }

];
const DEFAULT_LOC = { lat: 26.4499, lng: 80.3319 }; // Kanpur fallback

// Known localities used to translate raw GPS coordinates into a readable place
// name, the same way the recycler console shows named service areas instead of numbers.
const KNOWN_PLACES = [
    { name: 'Nayaganj', lat: 26.4675, lng: 80.3319 },
    { name: 'Swaroop Nagar', lat: 26.4780, lng: 80.3260 },
    { name: 'Kidwai Nagar', lat: 26.4460, lng: 80.3370 },
    { name: 'Govind Nagar', lat: 26.4550, lng: 80.3120 },
    { name: 'Kakadeo', lat: 26.4710, lng: 80.3450 },
    { name: 'Civil Lines', lat: 26.4640, lng: 80.3480 },
    { name: 'Arya Nagar', lat: 26.4715, lng: 80.3330 },
    { name: 'Afeem Kothi', lat: 26.4635, lng: 80.3395 },
    { name: 'Chamanganj', lat: 26.4695, lng: 80.3410 }
];
function nearestPlaceName(lat, lng) {
    let best = null, bestDist = Infinity;
    KNOWN_PLACES.forEach(p => {
        const d = haversine(lat, lng, p.lat, p.lng);
        if (d < bestDist) { bestDist = d; best = p; }
    });
    if (!best) return '';
    return best.name + (bestDist > 0.4 ? ` (~${bestDist.toFixed(1)}km)` : '');
}

/* ================= STATE ================= */
let lots = Store.get('kc_lots', []);
let draft = {};
function saveLots() { Store.set('kc_lots', lots); }

/* ================= AUTH STATE ================= */
let ROLE = Store.get('kc_role', 'kw');
let USERNAME = Store.get('kc_name', null);
function showAuth(id) {
    ['onboarding', 'authLogin', 'authOtp', 'authName'].forEach(s => document.getElementById(s).classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    //auto-set cursor
    setTimeout(() => {
        const first = document.querySelector('#' + id + ' input');
        if (first) first.focus();
    }, 30);
}
function setRole(r) {
    ROLE = r; Store.set('kc_role', r);
    document.getElementById('roleKW').classList.toggle('active', r === 'kw');
    document.getElementById('roleRC').classList.toggle('active', r === 'rc');
    document.getElementById('loginEmoji').textContent = r === 'kw' ? '🧺' : '🏭';
}
function checkPhone() {
    const v = document.getElementById('phoneInput').value.replace(/\D/g, '');
    document.getElementById('phoneInput').value = v;
    document.getElementById('sendOtpBtn').disabled = v.length !== 10;
}
function sendOtp() {
    const v = document.getElementById('phoneInput').value;
    if (v.length !== 10) { showToast(t('invalidPhone')); return; }
    showAuth('authOtp');
    document.getElementById('otpSentLabel').textContent = t('otpSent') + v;
    document.querySelectorAll('#authOtp .otp-row input').forEach(i => i.value = '');
    showToast('OTP: 1234');
}
function otpMove(el) {
    el.value = el.value.replace(/\D/g, '').slice(0, 1);
    if (el.value && el.nextElementSibling) el.nextElementSibling.focus();
}

function otpKeydown(el, e) {
    if (e.key === 'Backspace' && !el.value && el.previousElementSibling) {
        el.previousElementSibling.focus();
    } else if (e.key === 'Enter') {
        verifyOtpNow();
    }
}
function verifyOtpNow() {
    let val = ''; document.querySelectorAll('#authOtp .otp-row input').forEach(i => val += i.value);
    if (val.length !== 4) { showToast(t('wrongOtp')); return; }
    if (USERNAME) { finishAuth(); } else { showAuth('authName'); }
}
function signOut() {
    try { localStorage.removeItem('kc_role'); localStorage.removeItem('kc_name'); } catch (e) { }
    window.location.href = 'index.html';
}
function checkName() {
    document.getElementById('nameContinueBtn').disabled = document.getElementById('nameInput').value.trim().length < 2;
}
function saveName() {
    const name = document.getElementById('nameInput').value.trim();
    if (name.length < 2) return;
    USERNAME = name; Store.set('kc_name', name);
    finishAuth();
}
function finishAuth() {
    // Recyclers get their own dashboard — send them there instead of the kabadiwala home screen.
    if (ROLE === 'rc') {
        Store.set('kc_name', USERNAME || '');
        window.location.href = 'kabadisetu-recycler.html';
        return;
    }
    document.getElementById('userNameDisplay').textContent = USERNAME || 'Raju';
    document.getElementById('avatarInit').textContent = (USERNAME || 'R').charAt(0).toUpperCase();
    showAuth('onboarding');
    document.getElementById('onboarding').classList.add('hidden');
    applyLang();
    renderAll();
}
/* ================= INIT / LANG ================= */
function setLang(l) {
    LANG = l; Store.set('kc_lang', l);
    applyLang();
    // Only send people to the login screen when they're picking a language
    // during onboarding (not yet signed in). Changing the language later
    // from the More tab should just re-translate the app in place.
    if (!USERNAME) {
        showAuth('authLogin');
    } else {
        renderAll();
    }
}
function applyLang() {
    document.documentElement.lang = LANG || 'en';
    document.querySelectorAll('[data-t]').forEach(el => {
        const k = el.getAttribute('data-t');
        el.innerHTML = t(k);
    });
    document.querySelectorAll('[data-tph]').forEach(el => {
        const k = el.getAttribute('data-tph');
        el.placeholder = t(k);
    });
    ['hi', 'mr', 'en'].forEach(l => {
        const chip = document.getElementById('chip-' + l);
        if (chip) chip.classList.toggle('active', LANG === l);
    });
    document.getElementById('aboutBody').innerHTML = t('aboutBody');
}

/* ================= NAV ================= */
function showView(name) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + name).classList.add('active');
    document.querySelectorAll('.navbtn').forEach(b => b.classList.toggle('active', b.dataset.view === name));
    if (name === 'home') renderPriceBoard();
    if (name === 'mylots') renderLotsList();
    if (name === 'ledger') renderLedger();
    if (name === 'more') renderMore();
    if (name === 'newlot') { resetLotFlow(); }
    window.scrollTo(0, 0);
}

/* ================= PRICE BOARD ================= */
function sparkline(hist) {
    const w = 52, h = 22, max = Math.max(...hist), min = Math.min(...hist), range = (max - min) || 1;
    const pts = hist.map((v, i) => {
        const x = (i / (hist.length - 1)) * w;
        const y = h - ((v - min) / range) * h;
        return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
    const up = hist[hist.length - 1] >= hist[0];
    return `<svg class="spark" viewBox="0 0 ${w} ${h}"><polyline points="${pts}" fill="none" stroke="${up ? '#2F6B52' : '#B8502F'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function speak(text) {
    try {
        if (!('speechSynthesis' in window)) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = LANG === 'hi' ? 'hi-IN' : LANG === 'mr' ? 'mr-IN' : 'en-IN';
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
    } catch (e) { }
}
function renderPriceBoard() {
    const box = document.getElementById('priceBoard');
    box.innerHTML = CATS.map(c => {
        const p = PRICES[c.key];
        const up = p.hist[p.hist.length - 1] >= p.hist[0];
        return `<div class="price-row">
      <div class="price-emoji">${c.em}</div>
      <div class="price-info">
        <div class="price-name">${t('cat_' + c.key)}</div>
        <div class="price-rate">₹${p.rate}/kg <span class="trend ${up ? 'up' : 'down'}">${up ? '▲' : '▼'}</span></div>
      </div>
      ${sparkline(p.hist)}
      <button class="listenbtn" onclick="speak('${t('cat_' + c.key).replace(/'/g, "\\'")} ${p.rate} ${LANG === 'en' ? 'rupees per kilo' : 'रुपये किलो'}')"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4z"/><path d="M16 8a5 5 0 0 1 0 8"/></svg></button>
    </div>`;
    }).join('');
}

/* ================= NEW LOT FLOW ================= */
function resetLotFlow() {
    draft = { category: null, weight: 2.0, photo: null, id: null };
    document.getElementById('catGrid').innerHTML = CATS.map(c =>
        `<div class="cattile" id="tile-${c.key}" onclick="pickCategory('${c.key}')">
      <span class="em">${c.em}</span><span class="lb">${t('cat_' + c.key)}</span>
    </div>`).join('');
    document.getElementById('photoPreview').style.display = 'none';
    document.getElementById('photoPlaceholder').style.display = 'block';
    document.getElementById('weightNum').textContent = draft.weight.toFixed(1);
    const banner = document.getElementById('aiBanner');
    if (banner) { banner.classList.add('hidden'); banner.innerHTML = ''; }
    lotStep(1);
}
function pickCategory(key) {
    draft.category = key;
    document.querySelectorAll('.cattile').forEach(el => el.classList.remove('sel'));
    document.getElementById('tile-' + key).classList.add('sel');
    setTimeout(() => lotStep(2), 180);
}
function lotStep(n) {
    for (let i = 1; i <= 4; i++) document.getElementById('lotstep-' + i).style.display = (i === n) ? 'block' : 'none';
    for (let i = 1; i <= 4; i++) document.getElementById('st' + i).classList.toggle('done', i <= n);
    if (n === 3) updateWeightUI();
    if (n === 4) buildConfirm();
}
document.getElementById('photoInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
        draft.photo = ev.target.result;
        document.getElementById('photoPreview').src = draft.photo;
        document.getElementById('photoPreview').style.display = 'block';
        document.getElementById('photoPlaceholder').style.display = 'none';
        runAiMaterialScan(draft.photo);
    };
    reader.readAsDataURL(file);
});

/* ================= AI MATERIAL SCANNER =================
   Lightweight on-device "AI": reads the photo's pixels (average colour,
   brightness, saturation, contrast/texture) with a canvas and matches it
   against a fingerprint for each scrap category — no server round-trip,
   works offline. Good enough to tell the kabadiwala "this looks like
   Cables" and nudge them if it disagrees with the category they tapped. */
function classifyPixels(px) {
    let n = 0, rSum = 0, gSum = 0, bSum = 0, brSum = 0, brSqSum = 0, satSum = 0, greenish = 0, coppery = 0;
    for (let i = 0; i < px.length; i += 4) {
        const r = px[i], g = px[i + 1], b = px[i + 2];
        const br = (r + g + b) / 3;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const sat = max === 0 ? 0 : (max - min) / max;
        rSum += r; gSum += g; bSum += b; brSum += br; brSqSum += br * br; satSum += sat;
        if (g > r + 12 && g > b + 12) greenish++;
        if (r > g + 15 && g > b) coppery++;
        n++;
    }
    const avgR = rSum / n, avgG = gSum / n, avgB = bSum / n;
    const avgBr = brSum / n;
    const variance = Math.max(0, (brSqSum / n) - (avgBr * avgBr));
    const contrast = Math.sqrt(variance);
    const avgSat = satSum / n;
    const greenRatio = greenish / n;
    const copperRatio = coppery / n;
    return { avgR, avgG, avgB, avgBr, contrast, avgSat, greenRatio, copperRatio };
}
function scoreMaterials(f) {
    // Each category gets a heuristic score from the extracted image fingerprint.
    const scores = {
        battery: (f.avgBr < 75 ? (75 - f.avgBr) : 0) + (f.avgSat < 0.22 ? 12 : 0),
        pcb: f.greenRatio * 260 + (f.contrast > 35 ? 10 : 0),
        cable: f.copperRatio * 200 + (f.contrast > 40 ? f.contrast * 0.6 : 0) + (f.avgSat > 0.28 ? 10 : 0),
        crt: (f.avgBr > 120 && f.avgSat < 0.18) ? (30 + (f.avgBr - 120) * 0.2) : 0,
        lcd: (f.avgBr > 90 && f.avgB > f.avgR && f.avgSat < 0.25) ? (28 + (f.avgB - f.avgR) * 0.5) : 0,
        motor: (f.contrast > 45 && f.avgSat < 0.3 && f.avgBr >= 70 && f.avgBr <= 150) ? (25 + f.contrast * 0.3) : 0,
        plastic: f.avgSat * 60 + (f.avgBr > 100 ? 10 : 0)
    };
    let bestKey = 'plastic', bestScore = -1;
    Object.keys(scores).forEach(k => { if (scores[k] > bestScore) { bestScore = scores[k]; bestKey = k; } });
    const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
    const confidence = Math.min(96, Math.max(52, Math.round((bestScore / total) * 100) + 40));
    return { key: bestKey, confidence };
}
function runAiMaterialScan(dataUrl) {
    const banner = document.getElementById('aiBanner');
    if (!banner) return;
    banner.className = 'ai-banner';
    banner.innerHTML = `<span class="ai-spin"></span><div class="ai-body"><div class="ai-tt">${t('aiScanning')}</div></div>`;
    const img = new Image();
    img.onload = function () {
        try {
            const size = 60;
            const canvas = document.createElement('canvas');
            canvas.width = size; canvas.height = size;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, size, size);
            const data = ctx.getImageData(0, 0, size, size).data;
            const fp = classifyPixels(data);
            const result = scoreMaterials(fp);
            draft.aiGuess = result.key;
            renderAiBanner(result);
        } catch (e) {
            banner.classList.add('hidden');
        }
    };
    img.onerror = function () { banner.classList.add('hidden'); };
    img.src = dataUrl;
}
function renderAiBanner(result) {
    const banner = document.getElementById('aiBanner');
    if (!banner) return;
    const cat = CATS.find(c => c.key === result.key);
    const label = t('cat_' + result.key);
    const matches = draft.category === result.key;
    banner.className = 'ai-banner ' + (matches ? 'match' : 'mismatch');
    if (matches) {
        banner.innerHTML = `<span class="ai-ic">${cat.em}</span><div class="ai-body">
      <div class="ai-tt">${t('aiMatch')} ${label} (${result.confidence}%)</div>
    </div>`;
    } else {
        banner.innerHTML = `<span class="ai-ic">${cat.em}</span><div class="ai-body">
      <div class="ai-tt">${t('aiMismatch')} ${label} (${result.confidence}%)</div>
      <div class="ai-ds">${t('aiMismatchNote')}</div>
      <button class="ai-fix" onclick="applyAiSuggestion()">${t('aiFixBtn')}</button>
    </div>`;
    }
}
function applyAiSuggestion() {
    if (!draft.aiGuess) return;
    draft.category = draft.aiGuess;
    showToast(t('aiSwitched'));
    renderAiBanner({ key: draft.aiGuess, confidence: 80 });
}
function adjWeight(delta) {
    draft.weight = Math.max(0.5, Math.round((draft.weight + delta) * 10) / 10);
    updateWeightUI();
}
function updateWeightUI() {
    document.getElementById('weightNum').textContent = draft.weight.toFixed(1);
    const est = Math.round(draft.weight * PRICES[draft.category].rate);
    document.getElementById('estAmt').textContent = est;
}
function buildConfirm() {
    const p = PRICES[draft.category];
    const est = Math.round(draft.weight * p.rate);
    draft.estValue = est;
    const cat = CATS.find(c => c.key === draft.category);
    document.getElementById('confirmSummary').innerHTML = `
    <div class="summary-line"><span>${t('weightLabel') === 'Weight' ? 'Material' : 'सामान'}</span><b>${cat.em} ${t('cat_' + draft.category)}</b></div>
    <div class="summary-line"><span>${t('weightLabel')}</span><b>${draft.weight.toFixed(1)} kg</b></div>
    <div class="summary-line"><span>${t('estValueLabel')}</span><b>₹${est}</b></div>
  `;
    document.getElementById('locStatus').textContent = t('gettingLocation');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                draft.loc = { lat: pos.coords.latitude, lng: pos.coords.longitude, approx: false };
                document.getElementById('locStatus').textContent = t('locationCaptured') + ' · ' + t('near') + ' ' + nearestPlaceName(draft.loc.lat, draft.loc.lng);
            },
            () => {
                draft.loc = { ...DEFAULT_LOC, approx: true };
                document.getElementById('locStatus').textContent = t('locationApprox') + ' · ' + t('near') + ' ' + nearestPlaceName(draft.loc.lat, draft.loc.lng);
            },
            { timeout: 6000 }
        );
    } else {
        draft.loc = { ...DEFAULT_LOC, approx: true };
        document.getElementById('locStatus').textContent = t('locationApprox') + ' · ' + t('near') + ' ' + nearestPlaceName(draft.loc.lat, draft.loc.lng);
    }
}
function saveLot() {
    const id = 'KC-' + Date.now().toString(36).toUpperCase();
    const lot = {
        id, category: draft.category, weight: draft.weight, photo: draft.photo,
        estValue: draft.estValue, rate: PRICES[draft.category].rate,
        status: 'quoted', createdAt: new Date().toISOString(),
        loc: draft.loc || { ...DEFAULT_LOC, approx: true },
        finalValue: null, paymentStatus: null, recyclerId: null, handover: null, synced: false
    };
    lots.unshift(lot);
    saveLots();
    showToast(t('toastLotSaved'));
    showView('mylots');
}

/* ================= MY LOTS ================= */
function statusPillClass(s) {
    return { draft: 'pill-grey', quoted: 'pill-amber', matched: 'pill-blue', handed_over: 'pill-blue', completed: 'pill-green' }[s] || 'pill-grey';
}
function statusLabel(s) {
    return { draft: t('statusDraft'), quoted: t('statusQuoted'), matched: t('statusMatched'), handed_over: t('statusHanded'), completed: t('statusCompleted') }[s] || s;
}
function renderLotsList() {
    const list = document.getElementById('lotsList');
    if (lots.length === 0) {
        list.innerHTML = `<div class="empty"><span class="em">📦</span>${t('noLotsYet')}</div>`;
        return;
    }
    list.innerHTML = lots.map(l => {
        const cat = CATS.find(c => c.key === l.category);
        const val = l.finalValue !== null ? l.finalValue : l.estValue;
        return `<div class="lotcard" onclick="openLot('${l.id}')">
      <div class="em">${cat.em}</div>
      <div class="mid">
        <div class="nm">${t('cat_' + l.category)} · ${l.weight.toFixed(1)}kg</div>
        <div class="meta"><span class="pill ${statusPillClass(l.status)}">${statusLabel(l.status)}</span></div>
      </div>
      <div class="amt">₹${val}</div>
    </div>`;
    }).join('');
}
function openLot(id) {
    const lot = lots.find(l => l.id === id);
    if (!lot) return;
    if (lot.status === 'quoted') openRecyclerMatch(id);
    else openHandoverRecord(id);
}

/* ================= RECYCLER MATCHING ================= */
function haversine(lat1, lng1, lat2, lng2) {
    const R = 6371, dLat = (lat2 - lat1) * Math.PI / 180, dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function openRecyclerMatch(lotId) {
    const lot = lots.find(l => l.id === lotId);
    const matches = RECYCLERS.filter(r => r.materials === 'all' || r.materials.includes(lot.category))
        .map(r => ({ ...r, dist: haversine(lot.loc.lat, lot.loc.lng, r.lat, r.lng), offered: Math.round(lot.estValue * r.mult) }));
    const authed = matches.filter(m => m.authorized).sort((a, b) => b.offered - a.offered || a.dist - b.dist);
    const unauthed = matches.filter(m => !m.authorized);
    let html = `<h1 class="pagehead">${t('recyclerMatchTitle')}</h1>`;
    if (matches.length === 0) html += `<p class="pagesub">${t('noRecyclers')}</p>`;
    html += authed.map(r => recCardHtml(r, lotId, true)).join('');
    if (unauthed.length) {
        html += `<div class="warnbox">${t('notRecommendedHead')} — ${t('notRecommendedNote')}</div>`;
        html += unauthed.map(r => recCardHtml(r, lotId, false)).join('');
    }
    document.getElementById('sheetContent').innerHTML = html;
    openSheet();
}
function recCardHtml(r, lotId, authorized) {
    return `<div class="rec-card ${authorized ? '' : 'unauth'}">
    <div class="rec-top">
      <div>
        <div class="rec-name">${r.name}</div>
        <div class="rec-meta">${r.dist.toFixed(1)} ${t('distanceAway')} · ${r.pickup ? t('pickupYes') : t('pickupNo')}</div>
      </div>
      <span class="pill ${authorized ? 'pill-green' : 'pill-rust'}">${authorized ? t('authorizedBadge') : t('notAuthorizedBadge')}</span>
    </div>
    <div class="row" style="align-items:center;">
      <div class="grow"><div class="rec-val">₹${r.offered}</div><div style="font-size:11px;color:var(--ink-soft);">${t('offeredValueLabel')}</div></div>
      <button class="btn ${authorized ? 'btn-amber' : 'btn-outline'} btn-sm" ${authorized ? `onclick="confirmHandover('${lotId}','${r.id}')"` : 'disabled'}>${t('selectHandover')}</button>
    </div>
  </div>`;
}
function confirmHandover(lotId, recyclerId) {
    const lot = lots.find(l => l.id === lotId);
    const r = RECYCLERS.find(x => x.id === recyclerId);
    const offered = Math.round(lot.estValue * r.mult);
    lot.status = 'handed_over';
    lot.recyclerId = recyclerId;
    lot.finalValue = offered;
    lot.paymentStatus = 'pending';
    lot.handover = {
        ref: 'HX-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
        time: new Date().toISOString(),
        lat: lot.loc.lat, lng: lot.loc.lng
    };
    saveLots();
    openHandoverRecord(lotId);
}
function openHandoverRecord(lotId) {
    const lot = lots.find(l => l.id === lotId);
    const r = RECYCLERS.find(x => x.id === lot.recyclerId);
    const h = lot.handover;
    const cat = CATS.find(c => c.key === lot.category);
    const dt = h ? new Date(h.time).toLocaleString() : '';
    const placeName = h ? nearestPlaceName(h.lat, h.lng) : '—';
    const waText = encodeURIComponent(`KabadiSetu handover\nRef: ${h ? h.ref : ''}\nMaterial: ${t('cat_' + lot.category)} (${lot.weight}kg)\nRecycler: ${r ? r.name : ''}\nValue: ₹${lot.finalValue}\nTime: ${dt}`);
    document.getElementById('sheetContent').innerHTML = `
    <h1 class="pagehead">${t('handoverTitle')}</h1>
    <div class="refbox"><div class="lb">${t('refLabel')}</div><div class="code">${h ? h.ref : '—'}</div></div>
    <div class="card">
      <div class="summary-line"><span>${cat.em} ${t('cat_' + lot.category)}</span><b>${lot.weight.toFixed(1)}kg</b></div>
      <div class="summary-line"><span>${t('recyclerLabel')}</span><b>${r ? r.name : '—'}</b></div>
      <div class="summary-line"><span>${t('valueLabel')}</span><b>₹${lot.finalValue}</b></div>
      <div class="summary-line"><span>${t('timeLabel')}</span><b>${dt}</b></div>
      <div class="summary-line"><span>${t('gpsLabel')}</span><b>📍 ${placeName}</b></div>
      <div class="summary-line"><span>${t('paymentPending')}</span><b class="pill ${lot.paymentStatus === 'paid' ? 'pill-green' : 'pill-amber'}">${lot.paymentStatus === 'paid' ? t('paymentPaid') : t('paymentPending')}</b></div>
    </div>
    <div class="qr-box">
      <div class="qr-canvas-wrap" id="qrCanvas"></div>
      <div class="qr-cap">${t('qrCaption')}</div>
    </div>
    <a class="btn btn-ghost" style="text-decoration:none;margin-bottom:10px;" href="https://wa.me/?text=${waText}" target="_blank">${t('shareWhatsapp')}</a>
    ${lot.paymentStatus !== 'paid' ? `<button class="btn btn-amber" onclick="markPaid('${lot.id}')">${t('markCashReceived')}</button>` : `<button class="btn btn-primary" onclick="closeSheet()">${t('done')}</button>`}
  `;
    openSheet();
    renderTxnQr('qrCanvas', {
        ref: h ? h.ref : lot.id,
        material: t('cat_' + lot.category), weight: lot.weight, amount: lot.finalValue,
        time: dt, place: placeName, recycler: r ? r.name : '—', kabadiwala: USERNAME || '—',
        payment: lot.paymentStatus === 'paid' ? t('paymentPaid') : t('paymentPending')
    });
}
/* ================= QR CODE (per-transaction proof) =================
   Encodes a human-readable summary of the transaction directly into the QR
   code, so scanning it with any phone camera shows the full record —
   material, weight, amount, date/time, recycler and kabadiwala — with no
   app or server needed on the scanning side. */
function renderTxnQr(containerId, info) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';
    const payload = [
        'KabadiSetu Transaction',
        'Ref: ' + info.ref,
        'Date/Time: ' + info.time,
        'Kabadiwala: ' + info.kabadiwala,
        'Recycler: ' + info.recycler,
        'Material: ' + info.material + ' (' + Number(info.weight).toFixed(1) + ' kg)',
        'Amount: Rs.' + info.amount,
        'Payment: ' + info.payment,
        'Location: ' + info.place
    ].join('\n');
    try {
        if (typeof QRCode === 'undefined') throw new Error('QR library not loaded');
        // qrcodejs writes one byte per character (charCodeAt) and has no
        // Unicode support, so ₹ / Hindi / Marathi text silently corrupts it
        // and leaves a blank box. Pre-encoding the string as UTF-8 bytes
        // (standard escape/unescape trick) makes it scan correctly on any
        // reader, since byte-mode QR data with no ECI header is read as
        // UTF-8 by virtually every modern scanner.
        const safePayload = unescape(encodeURIComponent(payload));
        new QRCode(el, { text: safePayload, width: 168, height: 168, correctLevel: QRCode.CorrectLevel.M });
    } catch (e) {
        // Never leave a blank box: if the QR library failed to load (e.g. no
        // internet when this page first opened) or errors out, still show
        // the full transaction details as readable text.
        el.innerHTML = `<pre style="margin:0;text-align:left;white-space:pre-wrap;font-family:inherit;font-size:11px;line-height:1.6;">${payload.replace(/</g, '&lt;')}</pre>`;
    }
}
function markPaid(lotId) {
    const lot = lots.find(l => l.id === lotId);
    lot.paymentStatus = 'paid'; lot.status = 'completed';
    saveLots();
    openHandoverRecord(lotId);
    renderLedger();
}

/* ================= SHEET ================= */
function openSheet() { document.getElementById('sheetBg').classList.remove('hidden'); }
function closeSheet() { document.getElementById('sheetBg').classList.add('hidden'); renderLotsList(); renderLedger(); }

/* ================= LEDGER ================= */
function renderLedger() {
    const paid = lots.filter(l => l.paymentStatus === 'paid');
    const pending = lots.filter(l => l.paymentStatus === 'pending');
    const total = paid.reduce((s, l) => s + l.finalValue, 0);
    const due = pending.reduce((s, l) => s + l.finalValue, 0);
    document.getElementById('ledgerTotal').textContent = '₹' + total;
    document.getElementById('ledgerPending').textContent = '₹' + due;
    document.getElementById('pendingList').innerHTML = pending.length ? pending.map(l => {
        const cat = CATS.find(c => c.key === l.category);
        return `<div class="txn"><span><span class="em">${cat.em}</span>${t('cat_' + l.category)}</span><span>₹${l.finalValue} <button class="btn btn-sm btn-outline" style="margin-left:6px;" onclick="markPaid('${l.id}');renderLedger();">${t('markCashReceived')}</button></span></div>`;
    }).join('') : `<div class="empty" style="padding:16px;">${t('noTransactions')}</div>`;
    document.getElementById('paidList').innerHTML = paid.length ? paid.map(l => {
        const cat = CATS.find(c => c.key === l.category);
        const r = RECYCLERS.find(x => x.id === l.recyclerId);
        return `<div class="txn"><span><span class="em">${cat.em}</span>${t('cat_' + l.category)} · ${r ? r.name.split(' ')[0] : ''}</span><b>₹${l.finalValue}</b></div>`;
    }).join('') : `<div class="empty" style="padding:16px;">${t('noTransactions')}</div>`;
}

/* ================= MORE / SAFETY ================= */
function safetyIllustration(i) {
    // Small self-contained flat-style SVG illustrations — no external images,
    // so the safety guide still works fully offline.
    const svgs = {
        1: `<svg class="illus" viewBox="0 0 220 90" height="90"><rect width="220" height="90" fill="var(--rust-soft)"/><rect x="30" y="25" width="70" height="40" rx="4" fill="var(--ink)"/><rect x="96" y="36" width="8" height="18" fill="var(--ink)"/><rect x="36" y="31" width="58" height="28" rx="2" fill="var(--amber)"/><path d="M55 36 L48 47 L57 47 L50 58" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(140,20)"><circle cx="25" cy="25" r="24" fill="none" stroke="var(--rust)" stroke-width="3"/><path d="M25 13v16" stroke="var(--rust)" stroke-width="4" stroke-linecap="round"/><circle cx="25" cy="35" r="2.4" fill="var(--rust)"/></g></svg>`,
        2: `<svg class="illus" viewBox="0 0 220 90" height="90"><rect width="220" height="90" fill="var(--blue-soft)"/><rect x="34" y="18" width="90" height="58" rx="4" fill="var(--ink)"/><rect x="42" y="26" width="74" height="42" fill="var(--blue)"/><rect x="66" y="76" width="26" height="8" fill="var(--ink)"/><g transform="translate(150,22)"><rect x="0" y="14" width="26" height="34" rx="3" fill="none" stroke="var(--rust)" stroke-width="3"/><path d="M4 14 L22 48 M22 14 L4 48" stroke="var(--rust)" stroke-width="2.5"/></g></svg>`,
        3: `<svg class="illus" viewBox="0 0 220 90" height="90"><rect width="220" height="90" fill="var(--amber-soft)"/><path d="M40 66 Q34 48 42 34 Q46 46 52 40 Q56 58 44 66 Z" fill="var(--rust)"/><path d="M43 66 Q40 56 45 48 Q47 55 50 52 Q52 62 45 66 Z" fill="var(--amber)"/><line x1="14" y1="76" x2="200" y2="76" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><g transform="translate(120,20)"><circle cx="35" cy="35" r="30" fill="none" stroke="var(--rust)" stroke-width="4"/><line x1="14" y1="14" x2="56" y2="56" stroke="var(--rust)" stroke-width="4"/></g></svg>`,
        4: `<svg class="illus" viewBox="0 0 220 90" height="90"><rect width="220" height="90" fill="var(--green-soft)"/><rect x="30" y="16" width="46" height="58" rx="3" fill="none" stroke="var(--green-deep)" stroke-width="3"/><rect x="30" y="48" width="46" height="26" fill="var(--green-mid)" opacity="0.5"/><rect x="42" y="8" width="22" height="10" rx="2" fill="var(--green-deep)"/><g transform="translate(140,20)"><rect x="0" y="14" width="26" height="34" rx="3" fill="none" stroke="var(--rust)" stroke-width="3"/><path d="M4 14 L22 48 M22 14 L4 48" stroke="var(--rust)" stroke-width="2.5"/></g></svg>`,
        5: `<svg class="illus" viewBox="0 0 220 90" height="90"><rect width="220" height="90" fill="var(--green-soft)"/><path d="M40 30c0-8 6-14 14-14s14 6 14 14v10h10v22c0 10-8 18-18 18h-12c-10 0-18-8-18-18V46h10z" fill="var(--amber)"/><path d="M40 30c0-8 6-14 14-14s14 6 14 14v10h10v22c0 10-8 18-18 18h-12c-10 0-18-8-18-18V46h10z" fill="none" stroke="var(--amber-ink)" stroke-width="2"/><rect x="120" y="30" width="70" height="26" rx="13" fill="var(--blue)"/><circle cx="132" cy="43" r="7" fill="#fff"/><circle cx="178" cy="43" r="7" fill="#fff"/></svg>`,
        6: `<svg class="illus" viewBox="0 0 220 90" height="90"><rect width="220" height="90" fill="var(--amber-soft)"/><rect x="24" y="34" width="50" height="40" rx="3" fill="var(--rust-warm)"/><rect x="82" y="20" width="42" height="54" rx="3" fill="var(--green-mid)"/><g transform="translate(140,26)"><rect x="0" y="14" width="48" height="26" rx="3" fill="var(--ink)"/><rect x="46" y="20" width="18" height="18" rx="2" fill="var(--ink)"/><circle cx="14" cy="44" r="6" fill="var(--ink-soft)"/><circle cx="50" cy="44" r="6" fill="var(--ink-soft)"/></g></svg>`
    };
    return svgs[i] || '';
}
function renderMore() {
    applyLang();
    const pendingSync = lots.filter(l => !l.synced).length;
    document.getElementById('syncSub').textContent = pendingSync ? `${pendingSync} pending` : '✓ up to date';
    const em = { 1: '🔋', 2: '📺', 3: '🔥', 4: '🧪', 5: '🧤', 6: '📦' };
    document.getElementById('safetyList').innerHTML = [1, 2, 3, 4, 5, 6].map(i => {
        return `<div class="safety-card">
      <div class="sc-top">
        <div class="em">${em[i]}</div>
        <div class="grow">
          <div class="tt">${t('safety' + i + 't')}</div>
          <div class="ds">${t('safety' + i + 'd')}</div>
        </div>
        <button class="listenbtn" onclick="speak('${(t('safety' + i + 't') + '. ' + t('safety' + i + 'd')).replace(/'/g, "\\'")}')"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4z"/><path d="M16 8a5 5 0 0 1 0 8"/></svg></button>
      </div>
      ${safetyIllustration(i)}
    </div>`;
    }).join('');
}
function syncNow() {
    if (!navigator.onLine) { showToast(t('toastNoOffline')); return; }
    lots.forEach(l => l.synced = true);
    saveLots();
    showToast(t('toastSynced'));
    renderMore();
}

/* ================= TOAST ================= */
let toastTimer;
function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('hidden'), 2600);
}

/* ================= NET STATUS ================= */
function updateNet() {
    const online = navigator.onLine;
    const el = document.getElementById('netStatus');
    el.classList.toggle('offline', !online);
    document.getElementById('netStatusText').textContent = online ? 'Online' : 'Offline';
}
window.addEventListener('online', updateNet);
window.addEventListener('offline', updateNet);

/* ================= BOOT ================= */
function renderAll() {
    renderPriceBoard();
    renderLotsList();
    renderLedger();
    renderMore();
}
(function init() {
    if (LANG && USERNAME) {
        document.getElementById('userNameDisplay').textContent = USERNAME;
        document.getElementById('avatarInit').textContent = USERNAME.charAt(0).toUpperCase();
        document.getElementById('onboarding').classList.add('hidden');
        applyLang();
        updateNet();
        renderAll();
    } else if (LANG) {
        applyLang();
        showAuth('authLogin');
    } else {
        applyLang();
    }
})();