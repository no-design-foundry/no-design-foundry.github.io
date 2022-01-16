from pathlib import Path
import markdown
import re


base = Path(__file__).parent

def template(content):
    markdown_content = markdown.markdown(content)
    matches = re.finditer(r'<a href=".*?"()>',markdown_content)
    for match in list(matches)[::-1]:
        span_left, span_right = match.span(1)
        left = markdown_content[:span_left]
        right = markdown_content[span_right:]
        markdown_content = left + ' target="_blank"' + right
    return f"""
export default `{markdown_content}`
"""

for path in base.glob("*.md"):
    with open(path, "r") as input_file:
        data = input_file.read()
        with open(base/(path.stem + ".js"), "w+") as output_file:
            output_file.write(template(data))

