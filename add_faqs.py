import json

new_faqs = [
    {
        "number": "33",
        "question": "Do you charge an hourly rate or a fixed project fee?",
        "answer": "I work on a flat, project-based fee. This ensures complete transparency—you know the exact investment upfront before we start, and we can focus entirely on creating a premium, market-ready product without worrying about tracking hours."
    },
    {
        "number": "34",
        "question": "What is the typical investment for a packaging design project?",
        "answer": "Because every brand's needs are unique, pricing varies based on the scope and complexity of the packaging. Generally, my packaging design projects range from $50 to $250. This covers everything from the initial concept and print-ready artwork setup to high-quality 3D visualizations. Once I review your specific requirements, I will provide a detailed custom quote."
    },
    {
        "number": "35",
        "question": "What is your standard payment structure?",
        "answer": "To officially book your project in my schedule, I require a 50% initial deposit. The remaining 50% balance is due upon project completion, immediately before the handover of the final print-ready and editable source files."
    },
    {
        "number": "36",
        "question": "Do you offer adjusted rates for multiple flavors or SKUs?",
        "answer": "Yes. For multi-product lines, the heaviest lifting goes into creating the \"Master Design\" (the core visual system). Once the master concept is approved, applying that established design system across additional flavors, sizes, or variants (SKUs) is billed at a reduced per-SKU rate."
    },
    {
        "number": "37",
        "question": "Are there any hidden costs I should know about?",
        "answer": "No, my quotes are comprehensive and cover all design, 3D mockup generation, and print-ready file preparation. The only potential additional costs would be if your specific project requires purchasing exclusive commercial fonts or premium stock photography, which I will always discuss and get your approval for beforehand."
    }
]

with open('src/data/portfolio.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in new_faqs:
    # check if not already added to avoid duplicates
    if not any(f["question"] == item["question"] for f in data["faqs"]):
        data["faqs"].append(item)

with open('src/data/portfolio.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
