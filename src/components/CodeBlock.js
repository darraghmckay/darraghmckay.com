import React from 'react';
import PropTypes from 'prop-types';

const renderLines = code => {
  const lines = code.split('\n').filter(line => line.trim());
  const leadingPadding = lines[0].length - lines[0].trim().length;
  return lines.map((line, index) => (
    <span key={index}>
      <pre>{line.substring(leadingPadding)}</pre>
    </span>
  ));
};

const CodeBlock = ({ className, code }) => (
  <code className={`p-4 code-block ${className}`}>{renderLines(code)}</code>
);

CodeBlock.defaultProps = {
  className: '',
};

CodeBlock.propTypes = {
  className: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};

export default CodeBlock;
