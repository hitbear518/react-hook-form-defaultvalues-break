import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import useForm from 'react-hook-form';

import './styles.css';

function App() {
  const [name, setName] = useState();
  useEffect(() => {
    async function fetchData() {
      const [{ name }] = await fetch(
        'https://api.github.com/orgs/octokit/repos',
      ).then(res => res.json());
      setName(name);
    }
    fetchData();
  }, []);
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      example: name,
    },
  });
  if (!name) {
    return null;
  }
  const onSubmit = data => {
    console.log(data);
  }; // your form submit function which will invoke after successful validation

  console.log(watch('example')); // you can watch individual input by pass the name of the input

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Example</label>
      <input name="example" ref={register} />
      <label>ExampleRequired</label>
      <input
        name="exampleRequired"
        ref={register({ required: true, maxLength: 10 })}
      />
      {errors.exampleRequired && <p>This field is required</p>}
      <input type="submit" />
    </form>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
