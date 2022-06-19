import { View, Button, Alert, Image, Text, StyleSheet } from "react-native"
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker"
import { useState } from "react"
import { Colors } from "../../constants/colors"
import OutlinedButton from "../UI/OutlinedButton"
function ImagePicker () {

  const [pickedImage, setPickedImage] = useState()

  const [cameraPermissonsInformation, requestPermission] = useCameraPermissions()
  async function verifyPermissions () {
    if (cameraPermissonsInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }

    if (cameraPermissonsInformation.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient Permissions', 'You need to grant camera permissions to use this app.')
      return false
    }
    return true
  }

  async function takeImageHandler () {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    })
    setPickedImage(image.uri)
  }

  let imagePreview = <Text>No image taken yet.</Text>

  if (pickedImage) {
    imagePreview =
      <Image style={styles.image} source={{ uri: pickedImage }} />
  }

  return <View>
    <View style={styles.imagePreview}>
      {imagePreview}
    </View>
    <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
  </View>

}
export default ImagePicker

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  }
})