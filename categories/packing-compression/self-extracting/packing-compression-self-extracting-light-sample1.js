/*
 * Complexity: Simple
 * Techniques: self-extracting, eval-wrappers, base64
 * Intended For: Static Analysis Tool Testing
 * Malicious: No
 */

// Simple self-extracting archive
var archive = {
    metadata: { type: 'self-extracting', version: '1.0' },
    data: 'YWxlcnQoIlNpbXBsZSBzZWxmLWV4dHJhY3RpbmcgYXJjaGl2ZSIpOw==',
    extract: function() {
        return atob(this.data);
    }
};

var extracted = archive.extract();
eval(extracted);

// Self-extracting with checksum
var archiveWithChecksum = {
    data: 'Y29uc29sZS5sb2coIlNlbGYtZXh0cmFjdGluZyB3aXRoIGNoZWNrc3VtIik7',
    checksum: 'abc123',
    verify: function() {
        // Simple checksum verification
        return this.checksum === 'abc123';
    },
    extract: function() {
        if (this.verify()) {
            return atob(this.data);
        }
        return '';
    }
};

var verifiedExtracted = archiveWithChecksum.extract();
if (verifiedExtracted) {
    eval(verifiedExtracted);
}

// Self-extracting with multiple files
var multiFileArchive = {
    files: {
        'main.js': 'YWxlcnQoIk11bHRpLWZpbGUgc2VsZi1leHRyYWN0aW5nIik7',
        'helper.js': 'Y29uc29sZS5sb2coIkhlbHBlciBmaWxlIik7'
    },
    extract: function(filename) {
        if (this.files[filename]) {
            return atob(this.files[filename]);
        }
        return '';
    },
    extractAll: function() {
        var results = [];
        for (var filename in this.files) {
            if (this.files.hasOwnProperty(filename)) {
                results.push(atob(this.files[filename]));
            }
        }
        return results;
    }
};

var mainCode = multiFileArchive.extract('main.js');
if (mainCode) {
    eval(mainCode);
}

var allCodes = multiFileArchive.extractAll();
for (var i = 0; i < allCodes.length; i++) {
    eval(allCodes[i]);
}

// Self-extracting with compression
var compressedArchive = {
    compressed: 'eJwzNDcwMDTRMzQw0jM0MDIwNjA0MDI0MDQwNDAyMDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MDQwNjA0MD......',
    extract: function() {
        // Simulate decompression
        return atob('YWxlcnQoIkNvbXByZXNzZWQgc2VsZi1leHRyYWN0aW5nIik7');
    }
};

var decompressed = compressedArchive.extract();
eval(decompressed);

// Self-extracting with encryption simulation
var encryptedArchive = {
    encrypted: 'XXXXXX', // Placeholder for encrypted data
    key: 'secret',
    decrypt: function() {
        // Simple "decryption" simulation
        return atob('Y29uc29sZS5sb2coIkVuY3J5cHRlZCBzZWxmLWV4dHJhY3RpbmciKTs=');
    },
    extract: function() {
        return this.decrypt();
    }
};

var decrypted = encryptedArchive.extract();
eval(decrypted);

// Self-extracting with version check
var versionedArchive = {
    version: '2.1',
    minVersion: '2.0',
    data: 'ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiZGl2Iik7',
    checkVersion: function() {
        var versionParts = this.version.split('.').map(Number);
        var minVersionParts = this.minVersion.split('.').map(Number);
        
        if (versionParts[0] > minVersionParts[0]) {
            return true;
        } else if (versionParts[0] === minVersionParts[0] && versionParts[1] >= minVersionParts[1]) {
            return true;
        }
        return false;
    },
    extract: function() {
        if (this.checkVersion()) {
            return atob(this.data);
        }
        return '';
    }
};

if (versionedArchive.checkVersion()) {
    var versionedExtracted = versionedArchive.extract();
    eval(versionedExtracted);
}

// Self-extracting with dependencies
var dependencyArchive = {
    dependencies: ['base64', 'json'],
    data: 'YWxlcnQoIlNlbGYtZXh0cmFjdGluZyB3aXRoIGRlcGVuZGVuY2llcyIpOw==',
    checkDependencies: function() {
        return typeof atob !== 'undefined' && typeof JSON !== 'undefined';
    },
    extract: function() {
        if (this.checkDependencies()) {
            return atob(this.data);
        }
        return '';
    }
};

var dependencyExtracted = dependencyArchive.extract();
if (dependencyExtracted) {
    eval(dependencyExtracted);
}