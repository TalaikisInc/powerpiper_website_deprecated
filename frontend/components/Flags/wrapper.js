import Box from 'grommet/components/Box'

const Wrapper = (props) => {
  const cI = props.theme == 'dark' ? 'neutral-3' : 'neutral-2'

  return (
    <Box align='center' justify='center' responsive={true} colorIndex={cI}>
      { props.children }
    </Box>
  )
}

export default Wrapper
