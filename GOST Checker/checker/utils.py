from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
from docx.shared import Pt
from docx.enum.text import WD_BREAK
from docx.oxml.ns import qn

def map_alignment(align_str):
    """
    Преобразует строку 'left', 'right', 'center', 'justify' в соответствующее значение WD_PARAGRAPH_ALIGNMENT.
    """
    align_str = align_str.lower()
    if align_str == 'left':
        return WD_PARAGRAPH_ALIGNMENT.LEFT
    if align_str == 'right':
        return WD_PARAGRAPH_ALIGNMENT.RIGHT
    if align_str == 'center':
        return WD_PARAGRAPH_ALIGNMENT.CENTER
    return WD_PARAGRAPH_ALIGNMENT.JUSTIFY

def mm_to_pt(mm_value):
    """
    Конвертирует миллиметры (mm) в пункты (pt).
    В одном пункте (pt) ≈ 0.352777778 мм.
    """
    return mm_value / 0.352777778

def has_page_break(paragraph):
    for run in paragraph.runs:
        for br in run._element.findall('.//w:br', namespaces=run._element.nsmap):
            if br.get(qn('w:type')) == 'page':
                return True
    return False

def insert_page_breaks(doc):
    for i, paragraph in enumerate(doc.paragraphs):
        if paragraph.style.name == 'Heading 1':
            # Пропускаем первый параграф
            if i == 0:
                continue

            prev_para = doc.paragraphs[i - 1]
            if not has_page_break(prev_para):
                new_para = paragraph.insert_paragraph_before()
                new_para.add_run().add_break(WD_BREAK.PAGE)


def is_empty_paragraph(paragraph):
    """Проверяет, что абзац пустой — нет текста и runs пустые."""
    return not paragraph.text.strip() and all(not run.text.strip() for run in paragraph.runs)

def clean_empty_paragraphs(doc, heading_levels=(1, 2)):
    skipping_title_list = True
    allowed_styles = [f'Heading {lvl}' for lvl in heading_levels] + [f'Заголовок {lvl}' for lvl in heading_levels]
    i = 1
    for paragraph in doc.paragraphs:
        if skipping_title_list:
            i+=1
            if "Минск 2025" in paragraph.text:
                skipping_title_list = False
            continue
    while i < len(doc.paragraphs):
        paragraph = doc.paragraphs[i]
        if paragraph.style.name in allowed_styles:
            prev_para = doc.paragraphs[i - 1]
            if is_empty_paragraph(prev_para):
                p = prev_para._element
                p.getparent().remove(p)
                i -= 1  # после удаления список сдвинулся назад
        i += 1