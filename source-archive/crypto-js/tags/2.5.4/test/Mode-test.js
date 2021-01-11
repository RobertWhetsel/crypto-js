TestSuite.add(new YAHOO.tool.TestCase({
	
	_binaryData : Crypto.util.base64ToBytes(
	        "AAcOFRwjKjE4P0ZNVFtiaXB3foWMk5qhqK+2vcTL0tng5+71/AMKERgfJi00"+
	        "O0JJUFdeZWxzeoGIj5adpKuyucDHztXc4+rx+P8GDRQbIikwNz5FTFNaYWhv"+
	        "dn2Ei5KZoKeutbzDytHY3+bt9PsCCRAXHiUsMzpBSE9WXWRrcnmAh46VnKOq"+
	        "sbi/xs3U2+Lp8Pf+BQwTGiEoLzY9REtSWWBnbnV8g4qRmJ+mrbS7wsnQ197l"+
	        "7PP6AQgPFh0kKzI5QEdOVVxjanF4f4aNlJuiqbC3vsXM09rh6O/2/QQLEhkg"+
	        "Jy41PENKUVhfZm10e4KJkJeepayzusHIz9bd5Ovy+Q=="),

    _textData : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, " +
    		"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
    		"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
    		"nisi ut aliquip ex ea commodo consequat.",

    _iv : Crypto.util.base64ToBytes("AgMFBwsNERMXHR8lKSsvNQ=="),

	_key : Crypto.util.base64ToBytes(
			"Fy5FXHOKobjP5v0UK0JZcIeetczj+hEoP1ZthJuyyeA="),
	
	_compare: function(a, b, m) {
		// check result has expected length
		Assert.areEqual(a.length, b.length,"Output has length "+a.length+" but expected "+b.length);
		
		// check input has been preserved
		if( m==null ) m=a.length;
		for(var i=0;i<m;i++) {
			Assert.areEqual(a[i],b[i],"Byte "+i+" is "+a[i]+" not "+b[i]);
		}		
	},
	
	
	_testBinary: function(m,r) {
        var opts = {
            iv : this._iv.slice(0),
            asBytes : true,
            mode: m
        };
        
        // iso10126 uses random bytes, so a precise match is impossible
        var skipPad = 0;
        if( m._padding == Crypto.pad.iso10126 ) {
        	// skip last 16 bytes as they are random
        	skipPad = 16;
        }

        var output = Crypto.AES.encrypt(this._binaryData.slice(0),this._key,opts);
        this._compare(output,r,r.length-skipPad);
        
        for(var i=0;i<100;i++) {
        	var data = this._binaryData.slice(i);
        	var enc = Crypto.AES.encrypt(data,this._key,opts);
        	var dec = Crypto.AES.decrypt(enc,this._key,opts);
        	this._compare(data,dec);
        }		
	},
	
	_testText: function(m,r) {
        var opts = {
            iv : this._iv.slice(0),
            asBytes : true,
            mode: m
        };
        
        // iso10126 uses random bytes, so a precise match is impossible
        var skipPad = 0;
        if( m._padding == Crypto.pad.iso10126 ) {
        	// skip last 16 bytes as they are random
        	skipPad = 16;
        }
        
        var output = Crypto.AES.encrypt(this._textData,this._key,opts);
        this._compare(output,r,r.length-skipPad);
        
        opts = {
                iv : this._iv.slice(0),
                mode: m
            };           
        for(var i=0;i<100;i++) {
        	var data = this._textData.substring(i);
        	var enc = Crypto.AES.encrypt(data,this._key,opts);
        	var dec = Crypto.AES.decrypt(enc,this._key,opts);
        	this._compare(data,dec);
        }		
	},
	
	
	test_ECB_Binary: function() {
        this._testBinary(
                new Crypto.mode.ECB,
                Crypto.util.base64ToBytes(
                    "yUZlGPJOWQph4RRsOFmHR546qH39QmZeuq43K33BZi8UbFitayceKoRm"+
                    "97axGfeiQRYc/HlU9MrnEdN8cl4uRUy3MHJ805voCXoeQv9T/ZaxzXAd"+
                    "nZ03OK77mpyv7Wy9W6a8CHCeBIGnj07qrESaWR44kW2pcFJ28mDiir27"+
                    "bzVshm3SnIOWJ9RBe5AumeH9eqUHKDXT1bwyxozpXecnMhohbbzjMDU2"+
                    "dd6x/HuFRlaYoSjrDWtGAZPs7LLY3yF7fxJCUBk6Wl5u0x4aEb214hwi"+
                    "395zDrgT77vrtoGPa2TW9Zb6MrKaIQg4rqD0BZU3+A/EgEG+DCna2qel"+
                    "1NaCLy3DyKTB6JxBf7gQGpTm238=") );
	},
	
	
	
	test_ECB_Text: function() {
        this._testText(
                new Crypto.mode.ECB,
                Crypto.util.base64ToBytes(
                    "jvfZY1iDhmgOGK0buOrIusf3VMZo4y87nsDt8/FgQ7jl9M+q2ApiJLmU"+
                    "GWrni27AeMS8+ybGV4+bly2XDaOHaYv1VajdhqIIEv/BbRSFM51XbUiO"+
                    "Vo79FUXyT/NPZM/a/fX2ab5BpqMrcF7IPgB0nQKIJ5rmjQZSPBrs0j4/"+
                    "XSvGoL1U19wNAXG2sAxtO2FG9SPksEaqp2VBIhMi84YCsUfBdHd5A/gt"+
                    "dJSYWgGJqDoqdTXsHoAMWlptRpIwTybjx5F6FE/XSVrvHqCY4UI26B8h"+
                    "70kTszxqfM7HAhhTE+byyIBePBENU422NoCVtmU6") );		
	},

	
	test_CBC_Binary: function() {
        this._testBinary(
                new Crypto.mode.CBC,
                Crypto.util.base64ToBytes(
                    "lXl5aPuWvwLPhN7QVoT5/mTUv2qX3uRHYsrxJMGTQKyaZdPpWDnjtVE4"+
                    "0lR7siBNhosWaI8EfzJPo2VFcUV6J8McVVKuLJJ8WqOcqum/vj11T+BW"+
                    "b3Vsmp3S71GGPstOMCa0F5tiPqOlgPAhtMaNkJNxuue6xNfuuu/6DmTS"+
                    "j2t5TPhJK2pEG2L1L7sHmLi1B8OWen2Hc6ksZqIk8D67COQVXDmYQatE"+
                    "6SPsxvmyp73sZOkpoT5wnU6rw2N6rgYQgynOirMxa3WRet7xfqN9zGbT"+
                    "As9Q2M7qpcv7o7IuKhfKkkQMpTy8ChtIvNanrQvP4ZwRBlm/yyvTO+L9"+
                    "t0oNPte2f2NBSMS/OMMdEYhfQfY=") );

	},
	
	
	
	test_CBC_Text: function() {
        this._testText(
                new Crypto.mode.CBC,
                Crypto.util.base64ToBytes(
                    "3v1DbHZux/qLXbOE/Nb72B4MJmn4zMQOhZdaG1V8tOZ0HeekF7Bcg0I0"+
                    "s8bdeodgvD8DagMv2/1KnIVN/dhZbCkumnEqTNWJU8G/cAA1R/qx5Qoy"+
                    "j5oOccF7O8H8xatoxWzrc6XDxcuJlQ/Rhcqkzun8/2RbFZtGilSGnT9C"+
                    "IQsEghS7uZ7yibE0L8FH3OXWlD1GDFSWhVjStKv9XX4BqEpSvA0zQDrm"+
                    "YVpC1jTqJKYer9la5Ob77VapjvQmMCPDucCNEX9BaglceQWmY/YBpFWO"+
                    "Pz9NQXukur1yJPo1Hls09jsc7O3kf28yWFTIFdBD") );		
	},

	
	
	test_CFB_Binary: function() {
		this._testBinary(
				new Crypto.mode.CFB,
				Crypto.util.base64ToBytes(
                "XNgcJFiRBwRjMtq9xuo7M2zaTE+sg35rFR6Y3bhXMHcHJ6zZ+eEfWulxuGHE"+
                "F+TbHNVfZ1ji5z/mAaJ6buO00lEpvSiyTuts0N8gOlX2a+zPSGrdQYr818UN"+
                "Y91Q4cvrSm6zec/yiD1dnaEdXtHSm7I6CowH4f06cOd+GUx9WTlbKy4h+6/S"+
                "ocMRqWV52VHxtm+//v2EaWGFLzTopZAzt2Ukzmhu16j2VUyloKvPVk/B4U0/"+
                "LcpxDSFWMrD9W+0m0jXyijIckKc5COpUSfOGJPY2HrloboznaUZtiEsqK+1x"+
                "J10M173whcV405Y9mz0aqdpIZuSIC4U7NblcMHlSfw==") );
	},
	
	
	
	test_CFB_Text: function() {
		this._testText(
				new Crypto.mode.CFB,
				Crypto.util.base64ToBytes(
                "ELBgVCmSREUoePHQ9t41NaNH2/hyiMwonsFwnvYc9U2/SnfVfrDrMiirJFUq"+
                "YFzW6h55BQzkNAgYjbkl8K2PJZXXBNSWAPT+EWtD5ICrLj8DyfPpke8Lw94g"+
                "EIhI4KjWFFzRobaDjuN522bZiBxi77amx9YP4FtyZcOa0qrSi1QaOGnZBoZ1"+
                "q82Sjr9J1RzjkJaPI738QFQaMjryIBf6dfCgZy8g5rIKuTvLVLSRh8o238va"+
                "UKgzDjvDgj+dyKRXlQwQiNEa+Punh18HEpm/lWA+MldJL6eX8zf+ZKzpfEUF"+
                "en4leIJgTQ==") );
	},

	
	
	test_OFB_Binary: function() {		
		this._testBinary(
				new Crypto.mode.OFB,
				Crypto.util.base64ToBytes(
                "XNgcJFiRBwRjMtq9xuo7M93fLgEI6C29RMqDedSzsxdbtVl+Tz+1dRfpPEm+"+
                "usOMd1BRVrr6oSTsxb+8pJd5/HKomxCEYVXAsBsvzcgXc+YKzLomwPXtUa+s"+
                "LJBgEKLzPSUI+2IVCRgVFQGgQz6oy5xmZwEEKw1ulETtHlcFFu2i3J7C5dM2"+
                "c4iQI9JKKAwhWbmydff4NEzmchnME8mj6MCvO+ENEQ4dbw7fpU2PHv2CTP9a"+
                "rm5e+kpCkN+csqMfrvEneTmtvg5GnAYbelwuT7vTN5D7D0/1a14P7y5J0ZUr"+
                "TTkfgu0gGpC8aZvvDzLRINqsskJd5ecxvB2dssUCpw==") );
	},
	
	
	
    test_CTR_Vectors: function () {
        // www.ietf.org/rfc/rfc3686.txt

        // Test Vector #1
        var expected = Crypto.util.bytesToBase64([0xE4, 0x09, 0x5D, 0x4F, 0xB7, 0xA7, 0xB3, 0x79, 0x2D, 0x61, 0x75, 0xA3, 0x26, 0x13, 0x11, 0xB8]);
        var actual = Crypto.AES.encrypt(
            [0x53, 0x69, 0x6E, 0x67, 0x6C, 0x65, 0x20, 0x62, 0x6C, 0x6F, 0x63, 0x6B, 0x20, 0x6D, 0x73, 0x67],
            [0xAE, 0x68, 0x52, 0xF8, 0x12, 0x10, 0x67, 0xCC, 0x4B, 0xF7, 0xA5, 0x76, 0x55, 0x77, 0xF3, 0x9E],
            {
                iv: [0x00, 0x00, 0x00, 0x30, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01],
                mode: new Crypto.mode.CTR
            }
        );
        Assert.areEqual(expected, actual);

        // Test Vector #2
        var expected = Crypto.util.bytesToBase64([0x51, 0x04, 0xA1, 0x06, 0x16, 0x8A, 0x72, 0xD9, 0x79, 0x0D, 0x41, 0xEE, 0x8E, 0xDA, 0xD3, 0x88, 0xEB, 0x2E, 0x1E, 0xFC, 0x46, 0xDA, 0x57, 0xC8, 0xFC, 0xE6, 0x30, 0xDF, 0x91, 0x41, 0xBE, 0x28]);
        var actual = Crypto.AES.encrypt(
            [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F],
            [0x7E, 0x24, 0x06, 0x78, 0x17, 0xFA, 0xE0, 0xD7, 0x43, 0xD6, 0xCE, 0x1F, 0x32, 0x53, 0x91, 0x63],
            {
                iv: [0x00, 0x6C, 0xB6, 0xDB, 0xC0, 0x54, 0x3B, 0x59, 0xDA, 0x48, 0xD9, 0x0B, 0x00, 0x00, 0x00, 0x01],
                mode: new Crypto.mode.CTR
            }
        );
        Assert.areEqual(expected, actual);

        // Test Vector #3
        var expected = Crypto.util.bytesToBase64([0xC1, 0xCF, 0x48, 0xA8, 0x9F, 0x2F, 0xFD, 0xD9, 0xCF, 0x46, 0x52, 0xE9, 0xEF, 0xDB, 0x72, 0xD7, 0x45, 0x40, 0xA4, 0x2B, 0xDE, 0x6D, 0x78, 0x36, 0xD5, 0x9A, 0x5C, 0xEA, 0xAE, 0xF3, 0x10, 0x53, 0x25, 0xB2, 0x07, 0x2F]);
        var actual = Crypto.AES.encrypt(
            [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F, 0x20, 0x21, 0x22, 0x23],
            [0x76, 0x91, 0xBE, 0x03, 0x5E, 0x50, 0x20, 0xA8, 0xAC, 0x6E, 0x61, 0x85, 0x29, 0xF9, 0xA0, 0xDC],
            {
                iv: [0x00, 0xE0, 0x01, 0x7B, 0x27, 0x77, 0x7F, 0x3F, 0x4A, 0x17, 0x86, 0xF0, 0x00, 0x00, 0x00, 0x01],
                mode: new Crypto.mode.CTR
            }
        );
        Assert.areEqual(expected, actual);

        // Test Vector #4
        var expected = Crypto.util.bytesToBase64([0x4B, 0x55, 0x38, 0x4F, 0xE2, 0x59, 0xC9, 0xC8, 0x4E, 0x79, 0x35, 0xA0, 0x03, 0xCB, 0xE9, 0x28]);
        var actual = Crypto.AES.encrypt(
            [0x53, 0x69, 0x6E, 0x67, 0x6C, 0x65, 0x20, 0x62, 0x6C, 0x6F, 0x63, 0x6B, 0x20, 0x6D, 0x73, 0x67],
            [0x16, 0xAF, 0x5B, 0x14, 0x5F, 0xC9, 0xF5, 0x79, 0xC1, 0x75, 0xF9, 0x3E, 0x3B, 0xFB, 0x0E, 0xED, 0x86, 0x3D, 0x06, 0xCC, 0xFD, 0xB7, 0x85, 0x15],
            {
                iv: [0x00, 0x00, 0x00, 0x48, 0x36, 0x73, 0x3C, 0x14, 0x7D, 0x6D, 0x93, 0xCB, 0x00, 0x00, 0x00, 0x01],
                mode: new Crypto.mode.CTR
            }
        );
        Assert.areEqual(expected, actual);

        // Test Vector #5
        var expected = Crypto.util.bytesToBase64([0x45, 0x32, 0x43, 0xFC, 0x60, 0x9B, 0x23, 0x32, 0x7E, 0xDF, 0xAA, 0xFA, 0x71, 0x31, 0xCD, 0x9F, 0x84, 0x90, 0x70, 0x1C, 0x5A, 0xD4, 0xA7, 0x9C, 0xFC, 0x1F, 0xE0, 0xFF, 0x42, 0xF4, 0xFB, 0x00]);
        var actual = Crypto.AES.encrypt(
            [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F],
            [0x7C, 0x5C, 0xB2, 0x40, 0x1B, 0x3D, 0xC3, 0x3C, 0x19, 0xE7, 0x34, 0x08, 0x19, 0xE0, 0xF6, 0x9C, 0x67, 0x8C, 0x3D, 0xB8, 0xE6, 0xF6, 0xA9, 0x1A],
            {
                iv: [0x00, 0x96, 0xB0, 0x3B, 0x02, 0x0C, 0x6E, 0xAD, 0xC2, 0xCB, 0x50, 0x0D, 0x00, 0x00, 0x00, 0x01],
                mode: new Crypto.mode.CTR
            }
        );
        Assert.areEqual(expected, actual);
    },



    test_OFB_Text: function() {
		this._testText(
				new Crypto.mode.OFB,
				Crypto.util.base64ToBytes(
                "ELBgVCmSREUoePHQ9t41Nd+II+3wW9ZxiREZ5HMXD73eMcPux0nNRG6ScxTj"+
                "8uimTmloE7PlstFIalpEZByvKpIKPLAr79BVaJBMraxjI+9TlecK6M/TRam3"+
                "epiQu1wL/+3UK/6zt+mppYsixaCKr+0WF0UIeVtGrX7abRM7ELRHNXk6WRH4"+
                "4l1Gi3bz05itxyctHdfLXxinLg+fOPGFw9WsdfEJ9/bvnuUYfJBbshQn903e"+
                "L/7L2y4s5K3K8OIGgN8aRUW7oF9fj+nnm678xm4cqTBW/PZ77tyWdkVioONl"+
                "GXJby88eZQ==") );
	},
	
	
    test_ECB_iso7816_binary : function() {
        this._testBinary(
            new Crypto.mode.ECB(Crypto.pad.iso7816),
            Crypto.util.base64ToBytes(
                "yUZlGPJOWQph4RRsOFmHR546qH39QmZeuq43K33BZi8UbFitayceKoRm"+
                "97axGfeiQRYc/HlU9MrnEdN8cl4uRUy3MHJ805voCXoeQv9T/ZaxzXAd"+
                "nZ03OK77mpyv7Wy9W6a8CHCeBIGnj07qrESaWR44kW2pcFJ28mDiir27"+
                "bzVshm3SnIOWJ9RBe5AumeH9eqUHKDXT1bwyxozpXecnMhohbbzjMDU2"+
                "dd6x/HuFRlaYoSjrDWtGAZPs7LLY3yF7fxJCUBk6Wl5u0x4aEb214hwi"+
                "395zDrgT77vrtoGPa2TW9Zb6MrKaIQg4rqD0BZU3+A/EgEG+DCna2qel"+
                "1NaCLy3DyKTB6JxBf7gQGpTm238=") );
    },



    test_ECB_iso7816_text : function() {
        this._testText(
            new Crypto.mode.ECB(Crypto.pad.iso7816),
            Crypto.util.base64ToBytes(
                "jvfZY1iDhmgOGK0buOrIusf3VMZo4y87nsDt8/FgQ7jl9M+q2ApiJLmU"+
                "GWrni27AeMS8+ybGV4+bly2XDaOHaYv1VajdhqIIEv/BbRSFM51XbUiO"+
                "Vo79FUXyT/NPZM/a/fX2ab5BpqMrcF7IPgB0nQKIJ5rmjQZSPBrs0j4/"+
                "XSvGoL1U19wNAXG2sAxtO2FG9SPksEaqp2VBIhMi84YCsUfBdHd5A/gt"+
                "dJSYWgGJqDoqdTXsHoAMWlptRpIwTybjx5F6FE/XSVrvHqCY4UI26B8h"+
                "70kTszxqfM7HAhhTE+byyIBePBENU422NoCVtmU6") );
    },



    test_ECB_ansix923_binary : function() {
        this._testBinary(
            new Crypto.mode.ECB(Crypto.pad.ansix923),
            Crypto.util.base64ToBytes(
                "yUZlGPJOWQph4RRsOFmHR546qH39QmZeuq43K33BZi8UbFitayceKoRm"+
                "97axGfeiQRYc/HlU9MrnEdN8cl4uRUy3MHJ805voCXoeQv9T/ZaxzXAd"+
                "nZ03OK77mpyv7Wy9W6a8CHCeBIGnj07qrESaWR44kW2pcFJ28mDiir27"+
                "bzVshm3SnIOWJ9RBe5AumeH9eqUHKDXT1bwyxozpXecnMhohbbzjMDU2"+
                "dd6x/HuFRlaYoSjrDWtGAZPs7LLY3yF7fxJCUBk6Wl5u0x4aEb214hwi"+
                "395zDrgT77vrtoGPa2TW9Zb6MrKaIQg4rqD0BZU3+A/EgEG+DCna2qel"+
                "1NaCL2AspFJ5G6riC4eVGErtZa8=") );
    },



    test_ECB_ansix923_text : function() {
        this._testText(
            new Crypto.mode.ECB(Crypto.pad.ansix923),
            Crypto.util.base64ToBytes(
                "jvfZY1iDhmgOGK0buOrIusf3VMZo4y87nsDt8/FgQ7jl9M+q2ApiJLmU"+
                "GWrni27AeMS8+ybGV4+bly2XDaOHaYv1VajdhqIIEv/BbRSFM51XbUiO"+
                "Vo79FUXyT/NPZM/a/fX2ab5BpqMrcF7IPgB0nQKIJ5rmjQZSPBrs0j4/"+
                "XSvGoL1U19wNAXG2sAxtO2FG9SPksEaqp2VBIhMi84YCsUfBdHd5A/gt"+
                "dJSYWgGJqDoqdTXsHoAMWlptRpIwTybjx5F6FE/XSVrvHqCY4UI26B8h"+
                "70kTszxqfM7HAhhTE+bg0742mH7WeAWw7fsHu3To") );
    },



    test_ECB_iso10126_binary : function() {
        this._testBinary(
            new Crypto.mode.ECB(Crypto.pad.iso10126),
            Crypto.util.base64ToBytes(
                "yUZlGPJOWQph4RRsOFmHR546qH39QmZeuq43K33BZi8UbFitayceKoRm"+
                "97axGfeiQRYc/HlU9MrnEdN8cl4uRUy3MHJ805voCXoeQv9T/ZaxzXAd"+
                "nZ03OK77mpyv7Wy9W6a8CHCeBIGnj07qrESaWR44kW2pcFJ28mDiir27"+
                "bzVshm3SnIOWJ9RBe5AumeH9eqUHKDXT1bwyxozpXecnMhohbbzjMDU2"+
                "dd6x/HuFRlaYoSjrDWtGAZPs7LLY3yF7fxJCUBk6Wl5u0x4aEb214hwi"+
                "395zDrgT77vrtoGPa2TW9Zb6MrKaIQg4rqD0BZU3+A/EgEG+DCna2qel"+
                "1NaCL8bI0qmEAHQ3mAR8Vp6XAmA=") );
    },



    test_ECB_iso10126_text : function() {
        this._testText(
            new Crypto.mode.ECB(Crypto.pad.iso10126),
            Crypto.util.base64ToBytes(
                "jvfZY1iDhmgOGK0buOrIusf3VMZo4y87nsDt8/FgQ7jl9M+q2ApiJLmU"+
                "GWrni27AeMS8+ybGV4+bly2XDaOHaYv1VajdhqIIEv/BbRSFM51XbUiO"+
                "Vo79FUXyT/NPZM/a/fX2ab5BpqMrcF7IPgB0nQKIJ5rmjQZSPBrs0j4/"+
                "XSvGoL1U19wNAXG2sAxtO2FG9SPksEaqp2VBIhMi84YCsUfBdHd5A/gt"+
                "dJSYWgGJqDoqdTXsHoAMWlptRpIwTybjx5F6FE/XSVrvHqCY4UI26B8h"+
                "70kTszxqfM7HAhhTE+bnzrAzPGejNp7/fbt/gLrl") );
    },



    test_ECB_pkcs7_binary : function() {
        this._testBinary(
            new Crypto.mode.ECB(Crypto.pad.pkcs7),
            Crypto.util.base64ToBytes(
                "yUZlGPJOWQph4RRsOFmHR546qH39QmZeuq43K33BZi8UbFitayceKoRm"+
                "97axGfeiQRYc/HlU9MrnEdN8cl4uRUy3MHJ805voCXoeQv9T/ZaxzXAd"+
                "nZ03OK77mpyv7Wy9W6a8CHCeBIGnj07qrESaWR44kW2pcFJ28mDiir27"+
                "bzVshm3SnIOWJ9RBe5AumeH9eqUHKDXT1bwyxozpXecnMhohbbzjMDU2"+
                "dd6x/HuFRlaYoSjrDWtGAZPs7LLY3yF7fxJCUBk6Wl5u0x4aEb214hwi"+
                "395zDrgT77vrtoGPa2TW9Zb6MrKaIQg4rqD0BZU3+A/EgEG+DCna2qel"+
                "1NaCLyXrw4AOGYlhBfkzMl8tQUY=") );
    },



    test_ECB_pkcs7_text : function() {
        this._testText(
            new Crypto.mode.ECB(Crypto.pad.pkcs7),
            Crypto.util.base64ToBytes(
                "jvfZY1iDhmgOGK0buOrIusf3VMZo4y87nsDt8/FgQ7jl9M+q2ApiJLmU"+
                "GWrni27AeMS8+ybGV4+bly2XDaOHaYv1VajdhqIIEv/BbRSFM51XbUiO"+
                "Vo79FUXyT/NPZM/a/fX2ab5BpqMrcF7IPgB0nQKIJ5rmjQZSPBrs0j4/"+
                "XSvGoL1U19wNAXG2sAxtO2FG9SPksEaqp2VBIhMi84YCsUfBdHd5A/gt"+
                "dJSYWgGJqDoqdTXsHoAMWlptRpIwTybjx5F6FE/XSVrvHqCY4UI26B8h"+
                "70kTszxqfM7HAhhTE+bl00Ia4EScRG95FeQKaYr3") );
    },



    test_CBC_iso7816_binary : function() {
        this._testBinary(
            new Crypto.mode.CBC(Crypto.pad.iso7816),
            Crypto.util.base64ToBytes(
                "lXl5aPuWvwLPhN7QVoT5/mTUv2qX3uRHYsrxJMGTQKyaZdPpWDnjtVE4"+
                "0lR7siBNhosWaI8EfzJPo2VFcUV6J8McVVKuLJJ8WqOcqum/vj11T+BW"+
                "b3Vsmp3S71GGPstOMCa0F5tiPqOlgPAhtMaNkJNxuue6xNfuuu/6DmTS"+
                "j2t5TPhJK2pEG2L1L7sHmLi1B8OWen2Hc6ksZqIk8D67COQVXDmYQatE"+
                "6SPsxvmyp73sZOkpoT5wnU6rw2N6rgYQgynOirMxa3WRet7xfqN9zGbT"+
                "As9Q2M7qpcv7o7IuKhfKkkQMpTy8ChtIvNanrQvP4ZwRBlm/yyvTO+L9"+
                "t0oNPte2f2NBSMS/OMMdEYhfQfY=") );
    },



    test_CBC_iso7816_text : function() {
        this._testText(
            new Crypto.mode.CBC(Crypto.pad.iso7816),
            Crypto.util.base64ToBytes(
                "3v1DbHZux/qLXbOE/Nb72B4MJmn4zMQOhZdaG1V8tOZ0HeekF7Bcg0I0"+
                "s8bdeodgvD8DagMv2/1KnIVN/dhZbCkumnEqTNWJU8G/cAA1R/qx5Qoy"+
                "j5oOccF7O8H8xatoxWzrc6XDxcuJlQ/Rhcqkzun8/2RbFZtGilSGnT9C"+
                "IQsEghS7uZ7yibE0L8FH3OXWlD1GDFSWhVjStKv9XX4BqEpSvA0zQDrm"+
                "YVpC1jTqJKYer9la5Ob77VapjvQmMCPDucCNEX9BaglceQWmY/YBpFWO"+
                "Pz9NQXukur1yJPo1Hls09jsc7O3kf28yWFTIFdBD") );
    },



    test_CBC_ansix923_binary : function() {
        this._testBinary(
            new Crypto.mode.CBC(Crypto.pad.ansix923),
            Crypto.util.base64ToBytes(
                "lXl5aPuWvwLPhN7QVoT5/mTUv2qX3uRHYsrxJMGTQKyaZdPpWDnjtVE4"+
                "0lR7siBNhosWaI8EfzJPo2VFcUV6J8McVVKuLJJ8WqOcqum/vj11T+BW"+
                "b3Vsmp3S71GGPstOMCa0F5tiPqOlgPAhtMaNkJNxuue6xNfuuu/6DmTS"+
                "j2t5TPhJK2pEG2L1L7sHmLi1B8OWen2Hc6ksZqIk8D67COQVXDmYQatE"+
                "6SPsxvmyp73sZOkpoT5wnU6rw2N6rgYQgynOirMxa3WRet7xfqN9zGbT"+
                "As9Q2M7qpcv7o7IuKhfKkkQMpTy8ChtIvNanrQvP4ZwRBlm/yyvTO+L9"+
                "t0oNPrsX6uVdhhNtxWrVrIfHkTY=") );
    },



    test_CBC_ansix923_text : function() {
        this._testText(
            new Crypto.mode.CBC(Crypto.pad.ansix923),
            Crypto.util.base64ToBytes(
                "3v1DbHZux/qLXbOE/Nb72B4MJmn4zMQOhZdaG1V8tOZ0HeekF7Bcg0I0"+
                "s8bdeodgvD8DagMv2/1KnIVN/dhZbCkumnEqTNWJU8G/cAA1R/qx5Qoy"+
                "j5oOccF7O8H8xatoxWzrc6XDxcuJlQ/Rhcqkzun8/2RbFZtGilSGnT9C"+
                "IQsEghS7uZ7yibE0L8FH3OXWlD1GDFSWhVjStKv9XX4BqEpSvA0zQDrm"+
                "YVpC1jTqJKYer9la5Ob77VapjvQmMCPDucCNEX9BaglceQWmY/YBpFWO"+
                "Pz9NQXukur1yJPo1HlvrITcIpDKL6knedsHHr83A") );
    },



    test_CBC_iso10126_binary : function() {
        this._testBinary(
            new Crypto.mode.CBC(Crypto.pad.iso10126),
            Crypto.util.base64ToBytes(
                "lXl5aPuWvwLPhN7QVoT5/mTUv2qX3uRHYsrxJMGTQKyaZdPpWDnjtVE4"+
                "0lR7siBNhosWaI8EfzJPo2VFcUV6J8McVVKuLJJ8WqOcqum/vj11T+BW"+
                "b3Vsmp3S71GGPstOMCa0F5tiPqOlgPAhtMaNkJNxuue6xNfuuu/6DmTS"+
                "j2t5TPhJK2pEG2L1L7sHmLi1B8OWen2Hc6ksZqIk8D67COQVXDmYQatE"+
                "6SPsxvmyp73sZOkpoT5wnU6rw2N6rgYQgynOirMxa3WRet7xfqN9zGbT"+
                "As9Q2M7qpcv7o7IuKhfKkkQMpTy8ChtIvNanrQvP4ZwRBlm/yyvTO+L9"+
                "t0oNPtHUI5LSnRlyMX26SWGYRHk=") );
    },



    test_CBC_iso10126_text : function() {
        this._testText(
            new Crypto.mode.CBC(Crypto.pad.iso10126),
            Crypto.util.base64ToBytes(
                "3v1DbHZux/qLXbOE/Nb72B4MJmn4zMQOhZdaG1V8tOZ0HeekF7Bcg0I0"+
                "s8bdeodgvD8DagMv2/1KnIVN/dhZbCkumnEqTNWJU8G/cAA1R/qx5Qoy"+
                "j5oOccF7O8H8xatoxWzrc6XDxcuJlQ/Rhcqkzun8/2RbFZtGilSGnT9C"+
                "IQsEghS7uZ7yibE0L8FH3OXWlD1GDFSWhVjStKv9XX4BqEpSvA0zQDrm"+
                "YVpC1jTqJKYer9la5Ob77VapjvQmMCPDucCNEX9BaglceQWmY/YBpFWO"+
                "Pz9NQXukur1yJPo1Hlv4wvpqACZyr2T9phBEV7pn") );
    },



    test_CBC_pkcs7_binary : function() {
        this._testBinary(
            new Crypto.mode.CBC(Crypto.pad.pkcs7),
            Crypto.util.base64ToBytes(
                "lXl5aPuWvwLPhN7QVoT5/mTUv2qX3uRHYsrxJMGTQKyaZdPpWDnjtVE4"+
                "0lR7siBNhosWaI8EfzJPo2VFcUV6J8McVVKuLJJ8WqOcqum/vj11T+BW"+
                "b3Vsmp3S71GGPstOMCa0F5tiPqOlgPAhtMaNkJNxuue6xNfuuu/6DmTS"+
                "j2t5TPhJK2pEG2L1L7sHmLi1B8OWen2Hc6ksZqIk8D67COQVXDmYQatE"+
                "6SPsxvmyp73sZOkpoT5wnU6rw2N6rgYQgynOirMxa3WRet7xfqN9zGbT"+
                "As9Q2M7qpcv7o7IuKhfKkkQMpTy8ChtIvNanrQvP4ZwRBlm/yyvTO+L9"+
                "t0oNPiagnPydLr+0HZr/kJ4W2f4=") );
    },



    test_CBC_pkcs7_text : function() {
        this._testText(
            new Crypto.mode.CBC(Crypto.pad.pkcs7),
            Crypto.util.base64ToBytes(
                "3v1DbHZux/qLXbOE/Nb72B4MJmn4zMQOhZdaG1V8tOZ0HeekF7Bcg0I0"+
                "s8bdeodgvD8DagMv2/1KnIVN/dhZbCkumnEqTNWJU8G/cAA1R/qx5Qoy"+
                "j5oOccF7O8H8xatoxWzrc6XDxcuJlQ/Rhcqkzun8/2RbFZtGilSGnT9C"+
                "IQsEghS7uZ7yibE0L8FH3OXWlD1GDFSWhVjStKv9XX4BqEpSvA0zQDrm"+
                "YVpC1jTqJKYer9la5Ob77VapjvQmMCPDucCNEX9BaglceQWmY/YBpFWO"+
                "Pz9NQXukur1yJPo1HlvCYzUn8VxivHDm+AVJLX9n") );
    },



    test_CFB_iso7816_binary : function() {
        this._testBinary(
            new Crypto.mode.CFB(Crypto.pad.iso7816),
            Crypto.util.base64ToBytes(
                "XNgcJFiRBwRjMtq9xuo7M2zaTE+sg35rFR6Y3bhXMHcHJ6zZ+eEfWulx"+
                "uGHEF+TbHNVfZ1ji5z/mAaJ6buO00lEpvSiyTuts0N8gOlX2a+zPSGrd"+
                "QYr818UNY91Q4cvrSm6zec/yiD1dnaEdXtHSm7I6CowH4f06cOd+GUx9"+
                "WTlbKy4h+6/SocMRqWV52VHxtm+//v2EaWGFLzTopZAzt2Ukzmhu16j2"+
                "VUyloKvPVk/B4U0/LcpxDSFWMrD9W+0m0jXyijIckKc5COpUSfOGJPY2"+
                "HrloboznaUZtiEsqK+1xJ10M173whcV405Y9mz0aqdpIZuSIC4U7Nblc"+
                "MHlSf/06MLOgYvi0Kii3OF7uiwU=") );
    },



    test_CFB_iso7816_text : function() {
        this._testText(
            new Crypto.mode.CFB(Crypto.pad.iso7816),
            Crypto.util.base64ToBytes(
                "ELBgVCmSREUoePHQ9t41NaNH2/hyiMwonsFwnvYc9U2/SnfVfrDrMiir"+
                "JFUqYFzW6h55BQzkNAgYjbkl8K2PJZXXBNSWAPT+EWtD5ICrLj8DyfPp"+
                "ke8Lw94gEIhI4KjWFFzRobaDjuN522bZiBxi77amx9YP4FtyZcOa0qrS"+
                "i1QaOGnZBoZ1q82Sjr9J1RzjkJaPI738QFQaMjryIBf6dfCgZy8g5rIK"+
                "uTvLVLSRh8o238vaUKgzDjvDgj+dyKRXlQwQiNEa+Punh18HEpm/lWA+"+
                "MldJL6eX8zf+ZKzpfEUFen4leIJgTS3RPjhwu0sX") );
    },



    test_CFB_ansix923_binary : function() {
        this._testBinary(
            new Crypto.mode.CFB(Crypto.pad.ansix923),
            Crypto.util.base64ToBytes(
                "XNgcJFiRBwRjMtq9xuo7M2zaTE+sg35rFR6Y3bhXMHcHJ6zZ+eEfWulx"+
                "uGHEF+TbHNVfZ1ji5z/mAaJ6buO00lEpvSiyTuts0N8gOlX2a+zPSGrd"+
                "QYr818UNY91Q4cvrSm6zec/yiD1dnaEdXtHSm7I6CowH4f06cOd+GUx9"+
                "WTlbKy4h+6/SocMRqWV52VHxtm+//v2EaWGFLzTopZAzt2Ukzmhu16j2"+
                "VUyloKvPVk/B4U0/LcpxDSFWMrD9W+0m0jXyijIckKc5COpUSfOGJPY2"+
                "HrloboznaUZtiEsqK+1xJ10M173whcV405Y9mz0aqdpIZuSIC4U7Nblc"+
                "MHlSf306MLOgYvi0Kii3OF7uixU=") );
    },



    test_CFB_ansix923_text : function() {
        this._testText(
            new Crypto.mode.CFB(Crypto.pad.ansix923),
            Crypto.util.base64ToBytes(
                "ELBgVCmSREUoePHQ9t41NaNH2/hyiMwonsFwnvYc9U2/SnfVfrDrMiir"+
                "JFUqYFzW6h55BQzkNAgYjbkl8K2PJZXXBNSWAPT+EWtD5ICrLj8DyfPp"+
                "ke8Lw94gEIhI4KjWFFzRobaDjuN522bZiBxi77amx9YP4FtyZcOa0qrS"+
                "i1QaOGnZBoZ1q82Sjr9J1RzjkJaPI738QFQaMjryIBf6dfCgZy8g5rIK"+
                "uTvLVLSRh8o238vaUKgzDjvDgj+dyKRXlQwQiNEa+Punh18HEpm/lWA+"+
                "MldJL6eX8zf+ZKzpfEUFen4leIJgTa3RPjhwu0sf") );
    },



    test_CFB_iso10126_binary : function() {
        this._testBinary(
            new Crypto.mode.CFB(Crypto.pad.iso10126),
            Crypto.util.base64ToBytes(
                "XNgcJFiRBwRjMtq9xuo7M2zaTE+sg35rFR6Y3bhXMHcHJ6zZ+eEfWulx"+
                "uGHEF+TbHNVfZ1ji5z/mAaJ6buO00lEpvSiyTuts0N8gOlX2a+zPSGrd"+
                "QYr818UNY91Q4cvrSm6zec/yiD1dnaEdXtHSm7I6CowH4f06cOd+GUx9"+
                "WTlbKy4h+6/SocMRqWV52VHxtm+//v2EaWGFLzTopZAzt2Ukzmhu16j2"+
                "VUyloKvPVk/B4U0/LcpxDSFWMrD9W+0m0jXyijIckKc5COpUSfOGJPY2"+
                "HrloboznaUZtiEsqK+1xJ10M173whcV405Y9mz0aqdpIZuSIC4U7Nblc"+
                "MHlSfwaqFmH/6DOHdZd6VIBmyBU=") );
    },



    test_CFB_iso10126_text : function() {
        this._testText(
            new Crypto.mode.CFB(Crypto.pad.iso10126),
            Crypto.util.base64ToBytes(
                "ELBgVCmSREUoePHQ9t41NaNH2/hyiMwonsFwnvYc9U2/SnfVfrDrMiir"+
                "JFUqYFzW6h55BQzkNAgYjbkl8K2PJZXXBNSWAPT+EWtD5ICrLj8DyfPp"+
                "ke8Lw94gEIhI4KjWFFzRobaDjuN522bZiBxi77amx9YP4FtyZcOa0qrS"+
                "i1QaOGnZBoZ1q82Sjr9J1RzjkJaPI738QFQaMjryIBf6dfCgZy8g5rIK"+
                "uTvLVLSRh8o238vaUKgzDjvDgj+dyKRXlQwQiNEa+Punh18HEpm/lWA+"+
                "MldJL6eX8zf+ZKzpfEUFen4leIJgTX5rHZBXGQQf") );
    },



    test_CFB_pkcs7_binary : function() {
        this._testBinary(
            new Crypto.mode.CFB(Crypto.pad.pkcs7),
            Crypto.util.base64ToBytes(
                "XNgcJFiRBwRjMtq9xuo7M2zaTE+sg35rFR6Y3bhXMHcHJ6zZ+eEfWulx"+
                "uGHEF+TbHNVfZ1ji5z/mAaJ6buO00lEpvSiyTuts0N8gOlX2a+zPSGrd"+
                "QYr818UNY91Q4cvrSm6zec/yiD1dnaEdXtHSm7I6CowH4f06cOd+GUx9"+
                "WTlbKy4h+6/SocMRqWV52VHxtm+//v2EaWGFLzTopZAzt2Ukzmhu16j2"+
                "VUyloKvPVk/B4U0/LcpxDSFWMrD9W+0m0jXyijIckKc5COpUSfOGJPY2"+
                "HrloboznaUZtiEsqK+1xJ10M173whcV405Y9mz0aqdpIZuSIC4U7Nblc"+
                "MHlSf20qIKOwcuikOjinKE7+mxU=") );
    },



    test_CFB_pkcs7_text : function() {
        this._testText(
            new Crypto.mode.CFB(Crypto.pad.pkcs7),
            Crypto.util.base64ToBytes(
                "ELBgVCmSREUoePHQ9t41NaNH2/hyiMwonsFwnvYc9U2/SnfVfrDrMiir"+
                "JFUqYFzW6h55BQzkNAgYjbkl8K2PJZXXBNSWAPT+EWtD5ICrLj8DyfPp"+
                "ke8Lw94gEIhI4KjWFFzRobaDjuN522bZiBxi77amx9YP4FtyZcOa0qrS"+
                "i1QaOGnZBoZ1q82Sjr9J1RzjkJaPI738QFQaMjryIBf6dfCgZy8g5rIK"+
                "uTvLVLSRh8o238vaUKgzDjvDgj+dyKRXlQwQiNEa+Punh18HEpm/lWA+"+
                "MldJL6eX8zf+ZKzpfEUFen4leIJgTaXZNjB4s0Mf") );
    },



    test_OFB_iso7816_binary : function() {
        this._testBinary(
            new Crypto.mode.OFB(Crypto.pad.iso7816),
            Crypto.util.base64ToBytes(
                "XNgcJFiRBwRjMtq9xuo7M93fLgEI6C29RMqDedSzsxdbtVl+Tz+1dRfp"+
                "PEm+usOMd1BRVrr6oSTsxb+8pJd5/HKomxCEYVXAsBsvzcgXc+YKzLom"+
                "wPXtUa+sLJBgEKLzPSUI+2IVCRgVFQGgQz6oy5xmZwEEKw1ulETtHlcF"+
                "Fu2i3J7C5dM2c4iQI9JKKAwhWbmydff4NEzmchnME8mj6MCvO+ENEQ4d"+
                "bw7fpU2PHv2CTP9arm5e+kpCkN+csqMfrvEneTmtvg5GnAYbelwuT7vT"+
                "N5D7D0/1a14P7y5J0ZUrTTkfgu0gGpC8aZvvDzLRINqsskJd5ecxvB2d"+
                "ssUCp6jbjN3K8KBBn2MMfrnOhaU=") );
    },



    test_OFB_iso7816_text : function() {
        this._testText(
            new Crypto.mode.OFB(Crypto.pad.iso7816),
            Crypto.util.base64ToBytes(
                "ELBgVCmSREUoePHQ9t41Nd+II+3wW9ZxiREZ5HMXD73eMcPux0nNRG6S"+
                "cxTj8uimTmloE7PlstFIalpEZByvKpIKPLAr79BVaJBMraxjI+9TlecK"+
                "6M/TRam3epiQu1wL/+3UK/6zt+mppYsixaCKr+0WF0UIeVtGrX7abRM7"+
                "ELRHNXk6WRH44l1Gi3bz05itxyctHdfLXxinLg+fOPGFw9WsdfEJ9/bv"+
                "nuUYfJBbshQn903eL/7L2y4s5K3K8OIGgN8aRUW7oF9fj+nnm678xm4c"+
                "qTBW/PZ77tyWdkVioONlGXJby88eZUjjD/abdLBY") );
    },



    test_OFB_ansix923_binary : function() {
        this._testBinary(
            new Crypto.mode.OFB(Crypto.pad.ansix923),
            Crypto.util.base64ToBytes(
                "XNgcJFiRBwRjMtq9xuo7M93fLgEI6C29RMqDedSzsxdbtVl+Tz+1dRfp"+
                "PEm+usOMd1BRVrr6oSTsxb+8pJd5/HKomxCEYVXAsBsvzcgXc+YKzLom"+
                "wPXtUa+sLJBgEKLzPSUI+2IVCRgVFQGgQz6oy5xmZwEEKw1ulETtHlcF"+
                "Fu2i3J7C5dM2c4iQI9JKKAwhWbmydff4NEzmchnME8mj6MCvO+ENEQ4d"+
                "bw7fpU2PHv2CTP9arm5e+kpCkN+csqMfrvEneTmtvg5GnAYbelwuT7vT"+
                "N5D7D0/1a14P7y5J0ZUrTTkfgu0gGpC8aZvvDzLRINqsskJd5ecxvB2d"+
                "ssUCpyjbjN3K8KBBn2MMfrnOhbU=") );
    },



    test_OFB_ansix923_text : function() {
        this._testText(
            new Crypto.mode.OFB(Crypto.pad.ansix923),
            Crypto.util.base64ToBytes(
                "ELBgVCmSREUoePHQ9t41Nd+II+3wW9ZxiREZ5HMXD73eMcPux0nNRG6S"+
                "cxTj8uimTmloE7PlstFIalpEZByvKpIKPLAr79BVaJBMraxjI+9TlecK"+
                "6M/TRam3epiQu1wL/+3UK/6zt+mppYsixaCKr+0WF0UIeVtGrX7abRM7"+
                "ELRHNXk6WRH44l1Gi3bz05itxyctHdfLXxinLg+fOPGFw9WsdfEJ9/bv"+
                "nuUYfJBbshQn903eL/7L2y4s5K3K8OIGgN8aRUW7oF9fj+nnm678xm4c"+
                "qTBW/PZ77tyWdkVioONlGXJby88eZcjjD/abdLBQ") );
    },



    test_OFB_iso10126_binary : function() {
        this._testBinary(
            new Crypto.mode.OFB(Crypto.pad.iso10126),
            Crypto.util.base64ToBytes(
                "XNgcJFiRBwRjMtq9xuo7M93fLgEI6C29RMqDedSzsxdbtVl+Tz+1dRfp"+
                "PEm+usOMd1BRVrr6oSTsxb+8pJd5/HKomxCEYVXAsBsvzcgXc+YKzLom"+
                "wPXtUa+sLJBgEKLzPSUI+2IVCRgVFQGgQz6oy5xmZwEEKw1ulETtHlcF"+
                "Fu2i3J7C5dM2c4iQI9JKKAwhWbmydff4NEzmchnME8mj6MCvO+ENEQ4d"+
                "bw7fpU2PHv2CTP9arm5e+kpCkN+csqMfrvEneTmtvg5GnAYbelwuT7vT"+
                "N5D7D0/1a14P7y5J0ZUrTTkfgu0gGpC8aZvvDzLRINqsskJd5ecxvB2d"+
                "ssUCpy8MLiU0YuSyUQZR7SM0abU=") );
    },



    test_OFB_iso10126_text : function() {
        this._testText(
            new Crypto.mode.OFB(Crypto.pad.iso10126),
            Crypto.util.base64ToBytes(
                "ELBgVCmSREUoePHQ9t41Nd+II+3wW9ZxiREZ5HMXD73eMcPux0nNRG6S"+
                "cxTj8uimTmloE7PlstFIalpEZByvKpIKPLAr79BVaJBMraxjI+9TlecK"+
                "6M/TRam3epiQu1wL/+3UK/6zt+mppYsixaCKr+0WF0UIeVtGrX7abRM7"+
                "ELRHNXk6WRH44l1Gi3bz05itxyctHdfLXxinLg+fOPGFw9WsdfEJ9/bv"+
                "nuUYfJBbshQn903eL/7L2y4s5K3K8OIGgN8aRUW7oF9fj+nnm678xm4c"+
                "qTBW/PZ77tyWdkVioONlGXJby88eZQVh+O4Z3udQ") );
    },



    test_OFB_pkcs7_binary : function() {
        this._testBinary(
            new Crypto.mode.OFB(Crypto.pad.pkcs7),
            Crypto.util.base64ToBytes(
                "XNgcJFiRBwRjMtq9xuo7M93fLgEI6C29RMqDedSzsxdbtVl+Tz+1dRfp"+
                "PEm+usOMd1BRVrr6oSTsxb+8pJd5/HKomxCEYVXAsBsvzcgXc+YKzLom"+
                "wPXtUa+sLJBgEKLzPSUI+2IVCRgVFQGgQz6oy5xmZwEEKw1ulETtHlcF"+
                "Fu2i3J7C5dM2c4iQI9JKKAwhWbmydff4NEzmchnME8mj6MCvO+ENEQ4d"+
                "bw7fpU2PHv2CTP9arm5e+kpCkN+csqMfrvEneTmtvg5GnAYbelwuT7vT"+
                "N5D7D0/1a14P7y5J0ZUrTTkfgu0gGpC8aZvvDzLRINqsskJd5ecxvB2d"+
                "ssUCpzjLnM3a4LBRj3McbqnelbU=") );
    },



    test_OFB_pkcs7_text : function() {
        this._testText(
            new Crypto.mode.OFB(Crypto.pad.pkcs7),
            Crypto.util.base64ToBytes(
                "ELBgVCmSREUoePHQ9t41Nd+II+3wW9ZxiREZ5HMXD73eMcPux0nNRG6S"+
                "cxTj8uimTmloE7PlstFIalpEZByvKpIKPLAr79BVaJBMraxjI+9TlecK"+
                "6M/TRam3epiQu1wL/+3UK/6zt+mppYsixaCKr+0WF0UIeVtGrX7abRM7"+
                "ELRHNXk6WRH44l1Gi3bz05itxyctHdfLXxinLg+fOPGFw9WsdfEJ9/bv"+
                "nuUYfJBbshQn903eL/7L2y4s5K3K8OIGgN8aRUW7oF9fj+nnm678xm4c"+
                "qTBW/PZ77tyWdkVioONlGXJby88eZcDrB/6TfLhQ") );
    }
}));