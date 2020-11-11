import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Left,
  Body,
} from 'native-base';
import {MCC_COLORS} from '../Utils/Utils';

const Home = (props: any) => {
  return (
    <Container>
      <Content>
        <Card padder>
          <CardItem
            cardBody
            button
            onPress={() => props.navigation.navigate('SearchStackNavigation')}>
            <Image
              source={require('./../Images/taxi-moto.png')}
              style={styles.cardBody_image}
            />
          </CardItem>
          <CardItem>
            <Body style={styles.card_footer_container}>
              <Text>Louer un moto taxi pour vos courses</Text>
              <Button bordered style={styles.button_search}>
                <Text>Chercher un moto taxi</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardBody_image: {
    height: 200,
    width: null,
    flex: 1,
  },
  card_footer_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: MCC_COLORS.black,
  },
  button_search: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: '#1fe0',
    borderColor: MCC_COLORS.green,
  },
  button_text: {},
});

export default Home;
