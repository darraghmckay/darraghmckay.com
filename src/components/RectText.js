import React, { memo } from 'react';
import PropTypes from 'prop-types';

// Derived from https://oisinmoran.com/projects/text_width.html

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 *
 */
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const formatFont = (fontWeight, fontPx, font) =>
  `${fontWeight} ${fontPx}px ${font}`;

const getTextMetrics = (text, font) => {
  context.font = font;
  const {
    actualBoundingBoxAscent,
    actualBoundingBoxDescent,
    actualBoundingBoxLeft,
    actualBoundingBoxRight,
    width,
  } = context.measureText(text);
  return {
    height: actualBoundingBoxAscent
      ? actualBoundingBoxAscent + actualBoundingBoxDescent
      : 0,
    naiveWidth: width,
    width: actualBoundingBoxRight
      ? actualBoundingBoxRight + actualBoundingBoxLeft
      : width,
    actualBoundingBoxLeft: actualBoundingBoxLeft,
  };
};

const getMetricsForWidth = (string, width, fontWeight, font) => {
  const tolerancePx = 0.05;
  let difference = Infinity;
  let maxPx = 4000;
  let minPx = 0;
  let fontPx;
  let iterations = 0;
  let marginLeft;
  let heightPx;

  while (Math.abs(difference) > tolerancePx && iterations < 100) {
    fontPx = (maxPx + minPx) / 2;
    const { width: fontWidth, height, actualBoundingBoxLeft } = getTextMetrics(
      string,
      formatFont(fontWeight, fontPx, font),
    );
    marginLeft = actualBoundingBoxLeft;
    difference = width - fontWidth;
    heightPx = height;
    if (width > fontWidth) {
      minPx = fontPx;
    } else {
      maxPx = fontPx;
    }
    iterations = iterations + 1;
  }

  return {
    fontHeight: heightPx,
    fontSize: fontPx,
    marginLeft,
  };
};

const RectText = memo(
  ({ allowNewLines, text, width, fontWeight, font, uppercase, ...props }) => {
    const rectify = line => {
      const { marginLeft, fontSize } = getMetricsForWidth(
        line.replace(/^"|"$/g, ''),
        width,
        fontWeight,
        font,
      );
      const { naiveWidth: textWidthQuote } = /^"/.test(line)
        ? getTextMetrics('"', `${fontWeight} ${fontSize}px ${font}`)
        : { naiveWidth: 0 };
      return (
        <span
          key={line}
          style={{
            fontSize,
            textAlign: 'left',
            marginLeft: marginLeft - textWidthQuote,
            lineHeight: 0.9,
            fontWeight,
            fontFamily: font,
            whiteSpace: 'nowrap',
          }}
        >
          {line}
        </span>
      );
    };

    return (
      <React.Fragment>
        <div
          {...props}
          style={{ ...props.style, width }}
          className="flex flex-col"
        >
          {text
            .filter(Boolean)
            .map(line => line.trim())
            .map(line => (uppercase ? line.toUpperCase() : line))
            .map(rectify)}
        </div>
      </React.Fragment>
    );
  },
);

RectText.propTypes = {
  allowNewlines: PropTypes.bool,
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number.isRequired,
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  font: PropTypes.string,
  uppercase: PropTypes.bool,
};

RectText.defaultProps = {
  fontWeight: 'bold',
  font: 'Helvetica',
  uppercase: true,
};

export default RectText;
