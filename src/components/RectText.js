import React, { memo } from 'react';

// Derived from https://oisinmoran.com/projects/text_width.html

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
const canvas = document.createElement('canvas');

const getTextWidth = (text, font) => {
  const context = canvas.getContext('2d');
  context.font = font;
  return context.measureText(text).width;
};

// Returns the font pt to set string to to be goal_width pixels
const getPtForWidth = (string, width, fontWeight, font) => {
  const tolerance = 0.1; // tolerance in pixels
  let difference = Infinity;
  let maxPt = 1000;
  let minPt = 0;
  let fontPt;
  let fontWidth;
  let iterations = 0;

  while (Math.abs(difference) > tolerance && iterations < 100) {
    fontPt = (maxPt + minPt) / 2;
    fontWidth = getTextWidth(string, `${fontWeight} ${fontPt}pt ${font}`);
    difference = width - fontWidth;
    if (width > fontWidth) {
      minPt = fontPt;
    } else {
      maxPt = fontPt;
    }
    iterations = iterations + 1;
  }

  return fontPt;
};

const RectText = memo(({ text, width, fontWeight, font }) => {
  const rectify = line => {
    const fontSize = `${getPtForWidth(
      line.toUpperCase(),
      width,
      fontWeight,
      font,
    )}pt`;
    return (
      <span
        key={line}
        style={{
          fontSize,
          lineHeight: fontSize,
          fontWeight,
          fontFamily: font,
        }}
      >
        {line}
      </span>
    );
  };

  return <React.Fragment>{text.filter(Boolean).map(rectify)}</React.Fragment>;
});

RectText.defaultProps = {
  fontWeight: 'bold',
  font: 'Helvetica',
};

export default RectText;
