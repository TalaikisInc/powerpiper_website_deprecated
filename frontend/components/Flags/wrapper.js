import Box from 'grommet/components/Box'

const Wrapper = (props) => {
  return (
    <Box align='center' justify='center' responsive={true}>
      { props.children }
    </Box>
  )
}

export default Wrapper
