import json
import re

tabs = {
    "Services & Capabilities": [
        "What packaging formats do you design?",
        "Do you design the whole packaging or only the front label?",
        "Can you create the packaging concept from scratch?",
        "What if I already have a logo and brand identity?",
        "What if I don't have a brand identity yet?",
        "Do you have experience with international packaging markets?",
        "Do you have experience with supplement and nutrition packaging?",
        "Can you design FDA-compliant packaging?",
        "Can you design multiple flavors/SKUs under the same packaging system?",
        "Can you redesign an existing package instead of starting from scratch?",
        "Can you create packaging for Amazon/FBA products?"
    ],
    "Process & Collaboration": [
        "How do we get started?",
        "What information do you need before starting a packaging project?",
        "Can you create the packaging dieline?",
        "Can you work with an existing printer/manufacturer dieline?",
        "Can you help with the packaging copy and content?",
        "Can you work directly with my printer or manufacturer?",
        "Can you make revisions after I see the first concept?",
        "What happens if I don't have the physical product yet?",
        "Do you provide printing services?",
        "Can you help choose the right packaging material or printing finish?",
        "What if my printer rejects the artwork?",
        "Can you work with international clients remotely?",
        "How do you handle confidential product launches or unreleased brands?"
    ],
    "Deliverables & Files": [
        "Can you make the packaging print-ready?",
        "What files will I receive at the end?",
        "Will I receive the editable/source files?",
        "Do you provide 3D packaging mockups?",
        "Can you create realistic product images before the product is manufactured?"
    ],
    "Pricing & Timeline": [
        "How many packaging concepts will I receive?",
        "How long does a packaging project take?",
        "What do you need from me to give an accurate quote?"
    ]
}

def normalize(s):
    return re.sub(r'[^a-zA-Z0-9]', '', s).lower()

with open('src/data/portfolio.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for faq in data['faqs']:
    q_norm = normalize(faq['question'])
    assigned = 'Other'
    for cat, qs in tabs.items():
        if any(normalize(q) in q_norm or q_norm in normalize(q) for q in qs):
            assigned = cat
            break
    faq['category'] = assigned
    print(f"Assigned {assigned} to: {faq['question']}")

with open('src/data/portfolio.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
