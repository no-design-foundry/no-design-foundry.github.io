from pathlib import Path
import markdown


base = Path(__file__).parent

def template(content):
    return f"""
export default `{markdown.markdown(content)}`
"""

for path in base.glob("*.md"):
    with open(path, "r") as input_file:
        data = input_file.read()
        with open(base/(path.stem + ".js"), "w+") as output_file:
            output_file.write(template(data))