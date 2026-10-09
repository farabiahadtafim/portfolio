import re

with open('src/components/AboutSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'function CurvedTimelinePath.*?export default function AboutSection\(\) \{\n  const \{ profile, workHistory \} = usePortfolio\(\);.*?  \}, \[workHistory\]\);\n', 'export default function AboutSection() {\n  const { profile, workHistory } = usePortfolio();\n', content, flags=re.DOTALL)

with open('src/components/AboutSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
