import React, { useEffect, useState } from 'react';

const References = (props) => {
  const { references, addHandler, deleteHandler } = props;

  const referenceElements = references.map((r) => (
    <Reference key={r.url} source={r.source} url={r.url} deleteHandler={deleteHandler} />
  ));

  const existingSources = references.map((r) => r.source);

  return (
    <div>
      <table>
        <tbody>{referenceElements}</tbody>
      </table>
      <ReferenceInput addHandler={addHandler} existingSources={existingSources} />
    </div>
  );
};

const Reference = (props) => {
  const { source, url, deleteHandler } = props;
  const onDelete = () => deleteHandler(source);

  return (
    <tr>
      <td>{source}</td>
      <td>{url}</td>
      <td>
        <button type="button" onClick={onDelete}>
          x
        </button>
      </td>
    </tr>
  );
};

const ReferenceInput = (props) => {
  const { addHandler, existingSources } = props;

  const filterSources = (filter) => {
    const sources = ['Domain', 'Realestate'];
    return sources.filter((s) => !filter.includes(s));
  };

  const filteredSources = filterSources(existingSources);

  const [source, setSource] = useState(filteredSources[0]);
  const onSourceChange = (e) => {
    setSource(e.target.value);
  };

  useEffect(() => {
    const s = filterSources(existingSources);
    setSource(s[0]);
  }, [existingSources, setSource]);

  const [url, setUrl] = useState('');
  const onUrlChange = (e) => setUrl(e.target.value);

  if (filteredSources.length === 0) return <div>All options already filled</div>;

  const onSubmit = (e) => {
    e.preventDefault();
    if (url.trim() === '') {
      // TODO: Validate properly
      console.warn('URL Empty');
      return;
    }
    addHandler(source, url);

    setSource('');
    setUrl('');
  };

  return (
    <form onSubmit={onSubmit}>
      <SourceSelector value={source} onChange={onSourceChange} options={filteredSources} />
      <input type="textbox" placeholder="Paste URL" value={url} onChange={onUrlChange} />
      <button type="submit">Add</button>
    </form>
  );
};

const SourceSelector = (props) => {
  const { value, onChange, options } = props;

  const optionElements = options.map((o) => (
    <option key={o} value={o}>
      {o}
    </option>
  ));

  return (
    <select value={value} onChange={onChange}>
      {optionElements}
    </select>
  );
};

export default References;
