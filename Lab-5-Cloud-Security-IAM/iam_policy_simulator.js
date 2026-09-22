/**
 * Cloud Security IAM & RBAC Policy Engine
 * Evaluates access requests against JSON security policy documents.
 */

class IAMPolicyEvaluator {
    constructor(policies) {
        this.policies = policies;
    }

    matchPattern(pattern, value) {
        if (pattern === "*") return true;
        const regexPattern = "^" + pattern.replace(/\*/g, ".*") + "$";
        return new RegExp(regexPattern).test(value);
    }

    evaluate(request) {
        const { action, resource } = request;
        let isAllowed = false;

        for (const policy of this.policies) {
            for (const statement of policy.Statement) {
                const actionMatch = statement.Action.some(act => this.matchPattern(act, action));
                const resourceMatch = statement.Resource.some(res => this.matchPattern(res, resource));

                if (actionMatch && resourceMatch) {
                    // Rule 1: Explicit Deny overrides EVERYTHING
                    if (statement.Effect === "Deny") {
                        return {
                            decision: "DENIED",
                            reason: `Explicit Deny triggered by policy "${policy.PolicyName}" (Statement: "${statement.Sid}")`
                        };
                    }

                    // Rule 2: Match Allow
                    if (statement.Effect === "Allow") {
                        isAllowed = true;
                    }
                }
            }
        }

        if (isAllowed) {
            return { decision: "ALLOWED", reason: "Access granted by matching Allow statement" };
        }

        // Rule 3: Implicit Deny by default
        return { decision: "DENIED", reason: "Implicit Deny: No policy statements granted access" };
    }
}

// -------------------------------------------------------------
// Sample Security Policies (AWS IAM Schema)
// -------------------------------------------------------------
const sampleIAMDocument = [
    {
        PolicyName: "CloudStorageDeveloperAccess",
        Statement: [
            {
                Sid: "AllowS3ReadWrite",
                Effect: "Allow",
                Action: ["s3:GetObject", "s3:PutObject", "s3:ListBucket"],
                Resource: ["arn:aws:s3:::company-dev-bucket/*"]
            },
            {
                Sid: "DenyProdBucketAccess",
                Effect: "Deny",
                Action: ["s3:*"],
                Resource: ["arn:aws:s3:::company-prod-bucket/*"]
            }
        ]
    }
];

const testRequests = [
    {
        title: "Read file from dev bucket",
        action: "s3:GetObject",
        resource: "arn:aws:s3:::company-dev-bucket/logs.txt"
    },
    {
        title: "Write file to prod bucket (Should be Explicit Denied)",
        action: "s3:PutObject",
        resource: "arn:aws:s3:::company-prod-bucket/database.db"
    },
    {
        title: "Delete database resource (Should be Implicit Denied)",
        action: "dynamodb:DeleteItem",
        resource: "arn:aws:dynamodb:us-east-1:123456:table/Users"
    }
];


console.log("=" .repeat(65));
console.log(" 🔒 CLOUD IAM POLICY EVALUATION ENGINE");
console.log("=" .repeat(65));

const evaluator = new IAMPolicyEvaluator(sampleIAMDocument);

testRequests.forEach((req, idx) => {
    console.log(`\n[Test ${idx + 1}] ${req.title}`);
    console.log(`  • Action   : ${req.action}`);
    console.log(`  • Resource : ${req.resource}`);
    
    const result = evaluator.evaluate(req);
    const badge = result.decision === "ALLOWED" ? "✅ ALLOWED" : "❌ DENIED";
    console.log(`  • Decision : ${badge}`);
    console.log(`  • Reason   : ${result.reason}`);
});

console.log("=" .repeat(65));
