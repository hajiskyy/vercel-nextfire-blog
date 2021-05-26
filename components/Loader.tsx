interface Props {
  show: boolean
}

const Loader = (props: Props) => {
  return props.show ? <div className='loader'></div> : null;
}

export default Loader
