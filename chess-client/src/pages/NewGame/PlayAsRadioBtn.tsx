import { useRadio, Box, HStack, useRadioGroup, Tooltip } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="5px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          color: 'white',
          borderColor: 'orange.200',
        }}
        px="1"
        py="1"
      >
        {props.children}
      </Box>
    </Box>
  );
}

interface Props {
  onChange?(v: string): void;
}

const playAsImages = {
  w: { title: 'White', img: ['/assets', 'play-as-w.png'].join('/') },
  r: { title: 'Random', img: ['/assets', 'play-as-random.png'].join('/') },
  b: { title: 'Black', img: ['/assets', 'play-as-b.png'].join('/') },
};
// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export function PlayAsRadioBtn(props: Props) {
  const options = ['w', 'r', 'b'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'r',
    onChange: props.onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group} width="100%" display="flex" justify="center">
      {options.map((value) => {
        const radio = getRadioProps({ value });
        const opt = playAsImages[value as 'w' | 'b' | 'r'];
        return (
          <RadioCard key={value} {...radio}>
            <Tooltip hasArrow label={opt.title}>
              <img width="80" height="80" src={opt.img} />
            </Tooltip>
          </RadioCard>
        );
      })}
    </HStack>
  );
}
