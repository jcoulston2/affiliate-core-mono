//@flow
import * as React from 'react';

type FormProps = {
  onSubmit: Function,
  children: React.Node,
};

export default function Form({ onSubmit, children }: FormProps) {
  return <form onSubmit={onSubmit}> {children}</form>;
}
