import React, { useState } from 'react';
import RectText from '../../components/RectText';

const SAMPLE_FONT = '64px Helvetica';
const SAMPLE_TEXT = 'Hello World';

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
context.font = SAMPLE_FONT;

const getTextWidth = text => context.measureText(text);

const getAdvancedTextWidth = text => {
  const metrics = getTextWidth(text);
  return {
    width: metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft,
    actualBoundingBoxLeft: metrics.actualBoundingBoxLeft,
  };
};

const getNaiveTextWidth = text => getTextWidth(text).width;

const RektText = () => {
  const exampleWidth1 = getNaiveTextWidth(SAMPLE_TEXT);
  const exampleTextWidth2 = getAdvancedTextWidth(SAMPLE_TEXT);
  const [example3Value, setExample3Value] = useState('G');
  const [example3TextWidth, setExample3TextWidth] = useState(
    getTextWidth(example3Value),
  );

  const onExample3Input = ({ target: { value } }) => {
    const newValue = value.length ? value[value.length - 1] : 'G';
    setExample3Value(newValue);
    setExample3TextWidth(getTextWidth(newValue));
  };

  const [example4Value, setExample4Value] = useState('HELLO\nWORLD');
  const example4OnChange = ({ target: { value } }) => {
    setExample4Value(value);
  };

  return (
    <div className="rekt-text">
      <p>
        <a href="https://oisinmoran.com" tagret="_blank">
          Oisin Moran
        </a>
        <span>, my room-mate, and (ex-)coleague at</span>
        <a href="https://inscribe.ai" target="_blank">
          Inscribe
        </a>
        <span>
          , showed me his interesting solution to fitting several lines of text
          to a fixed-width. The aim is to adjust the font-size on each line such
          that each line is the exact same width. Much like the text-style in
          Instagram stories, on my homepage, or the example below.
        </span>
      </p>
      <div className="my-5 leading-none flex flex-col justify-center items-center mx-auto">
        <RectText
          text={['THE QUICK BROWN FOX', 'JUMPED', 'OVER THE', 'LAZY', 'DOG']}
          width={Math.min(400, Math.round(window.innerWidth * 0.7))}
        />
      </div>
      <p>
        It sounds easy, right? Just find the width of the text on each line and
        then set that width to be the width you want. Surely Javascript has a
        way to do that, right? Surely.
      </p>
      <p>Well it doesn't, at least not easily</p>
      <br />
      <p>
        Fortunately, stackoverflow had{' '}
        <a
          href=" https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393"
          target="_blank"
        >
          answers
        </a>
        to this question. You can put the text into a canvas and get the width
        of the text that way. Then Oisín used a simple binary search algorithm
        to find the font-size that gave the desired width in pixels for a
        particular line.
        <br />
      </p>
      <code>{`
        const getTextWidth = text => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          context.font = '72px Helvetica';
          const metrics = context.measureText(text);
          return metrics.width;
        };
      `}</code>
      <p>
        That sounds like it should work, right? Guess again.
        <br />
        <br />
        The div below is exactly {exampleWidth1}px wide, the result of{' '}
        <sub>getTextWidth('Hello World')</sub>, with a red background to
        highlight its size. Using this approach, you'd expect the text to fit
        exactly between the outline. But it doesn't.
      </p>
      <div className="example-text" style={{ width: exampleWidth1 }}>
        {SAMPLE_TEXT}
      </div>
      <p>
        That's because the width of the text takes into account the leading and
        trailing space of the first and last letter on the line. If you don't
        believe me, simply zoom in and highlight any letter and see that the
        space it consumes goes beyond the visual elements of the letter. This
        makes the calculations much, much harder.
      </p>
      <br />
      <h3>We might have a solution</h3>
      <p>
        <span>But the official MDN docs for the Canvas</span>
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics"
          target="_blank"
        >
          TextMetrics
        </a>
        <span>
          includes more metrics than just <sub>width</sub>. It also includes
          <sub>actualBoundingBoxLeft</sub> and <sub>actualBoundingBoxRight</sub>
          which looks like they might be more specific to what we want. So we
          could rewrite our function to find the difference between right and
          left.
        </span>
      </p>
      <code>
        {`
        const getAdvancedTextWidth = text => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          context.font = '72px Helvetica';
          const metrics = context.measureText(text);
          return metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft;
        };
      `}
      </code>
      <p>
        But as you can see from the example below, this actually over
        compensates. Which might appear to be better but it's still not the
        accuracy we're looking for. There's still leading space before the first
        letter, and the width seems to be too small to include the entire word.
      </p>
      <div className="example-text" style={{ width: exampleTextWidth2.width }}>
        {SAMPLE_TEXT}
      </div>
      <p>
        But this can actually be fixed by translating the text horizontally by
        the <sub>actualBoundingBoxLeft</sub> distance. Such that it fits
        perfectly in our bounding box. The final code, with a JSX (React)
        example would look like this
      </p>
      <code>
        {`
        const getAdvancedTextMetrics= text => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          context.font = '72px Helvetica';
          const metrics = context.measureText(text);
          return {
            width: metrics.actualBoundingBoxRight + metrics.actualBoundingBoxLeft,
            actualBoundingBoxLeft: metrics.actualBoundingBoxLeft,
          };
        };
      `}
      </code>

      <code>
        {`
        const textMetrics = getAdvancedTextMetrics('Hello World');

        <div style={{ width: textMetrics.width }}>
          <span style={{ marginLeft: textMetrics.actualBoundingBoxLeft }}>
            Hello World
          </span>
        </div>
      `}
      </code>
      <div className="example-text" style={{ width: exampleTextWidth2.width }}>
        <span style={{ marginLeft: exampleTextWidth2.actualBoundingBoxLeft }}>
          {SAMPLE_TEXT}
        </span>
      </div>
      <h3>See for yourself</h3>
      <p>
        The input below lets you pick any letter and see the positions of each
        metric. As before, the width is represented by the red background, the
        light-blue line is <sub>actualBoundingBoxLeft</sub> and the dark-blue
        line is
        <sub>actualBoundingBoxRight</sub>. (Be patient, it's kind of slow)
      </p>
      <div className="flex flex-row flex-wrap items-center">
        <div style={{ width: 300 }}>
          <input
            type="text"
            id="example-3"
            value={example3Value}
            onChange={onExample3Input}
          />
        </div>
        <div
          className="example-text"
          style={{ width: example3TextWidth.width }}
        >
          {example3Value}
          <div
            className="example-line line-1"
            style={{ left: -1 * example3TextWidth.actualBoundingBoxLeft - 1 }}
          />
          <div
            className="example-line line-2"
            style={{ left: example3TextWidth.actualBoundingBoxRight - 1 }}
          />
        </div>
      </div>
      <p>
        It's also worth mentioning that the only downside is that
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics#Browser_compatibility"
          target="_blank"
        >
          browser support
        </a>
        for these properties are limited.
      </p>
      <h3>Putting it all together</h3>
      <p>
        Now that we can accurately get the width of a line of text for a given
        font-size using canvas, we can write a simple search function that will
        efficiently find the best font-size, to a given tollerance, that will
        give you text of the desired width.
      </p>
      <code>
        {`
        const getMetricsForWidth = (string, width, fontWeight, font) => {
          const tolerance = 0.05; // tolerance in pixels
          let difference = Infinity;
          let maxPt = 1000;
          let minPt = 0;
          let fontPt;
          let iterations = 0;
          let marginLeft;
        
          while (Math.abs(difference) > tolerance && iterations < 100) {
            fontPt = (maxPt + minPt) / 2;
            const { width: fontWidth, actualBoundingBoxLeft } = getAdvancedTextMetrics(
              string,
              \`\${fontWeight} \${fontPt}px \${font}\`,
            );
            marginLeft = actualBoundingBoxLeft;
            difference = width - fontWidth;
            if (width > fontWidth) {
              minPt = fontPt;
            } else {
              maxPt = fontPt;
            }
            iterations = iterations + 1;
          }
        
          return {
            fontSize: fontPt,
            marginLeft,
          };
        };
      `}
      </code>
      <br />
      <br />
      <h3>Try it out</h3>
      <div className="my-6 flex flex-row flex-wrap justify-between">
        <textarea
          className="mr-8 p-2"
          onChange={example4OnChange}
          value={example4Value}
        />
        <div className="my-5 leading-none flex flex-col justify-center items-center mx-auto">
          <RectText
            text={example4Value.split('\n')}
            uppercase={false}
            width={Math.min(400, Math.round(window.innerWidth * 0.7))}
          />
        </div>
      </div>
      <br />
      <p>
        There's still a few things left to figure out, such as how to get a
        fixed width between each line of text. That is surprisingly difficult
        actually and needs to be solved in a similar way to how we solved for
        the width. So when I figure that out I'll probably write another post.
      </p>
    </div>
  );
};

export default RektText;
