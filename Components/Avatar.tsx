import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {LOAD_AVATAR_IMAGE} from '../Store/Actions/AvatarActionType';

const Avatar = (props: any) => {
  //variable du store redux
  const avatarSource: any = props.avatarSource;
  const dispatch: Function = props.dispatch;

  const options = {
    title: 'Selectionner une photo de profil',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const _openDeviceMedia = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        const action = {type: LOAD_AVATAR_IMAGE, value: source};
        dispatch(action); //publier dans le store globale
      }
    });
  };
  return (
    <TouchableOpacity
      style={styles.avatar_container}
      onPress={() => _openDeviceMedia()}>
      <Image source={avatarSource} style={styles.uploadAvatar} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar_container: {
    margin: 5,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadAvatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2,
  },
});

const mapStateToProps = (state: any) => {
  return {avatarSource: state.loadAvatar.avatarSource};
};

const mapDispatchToProps = (dispatchFun: Function) => {
  return {
    dispatch: (action: any) => {
      dispatchFun(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
