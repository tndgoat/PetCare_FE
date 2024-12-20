import React from 'react'
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native'

const ScheduleScreen = (props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          paddingTop: 85,
          paddingHorizontal: 35,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 29,
          }}
        >
          <Text
            style={{
              color: '#101623',
              fontSize: 24,
              marginRight: 4,
              flex: 1,
            }}
          >
            {'Schedule'}
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 36,
            }}
          >
            {'+'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#F3E8ED',
            borderRadius: 8,
            paddingRight: 15,
            marginBottom: 25,
          }}
        >
          <TouchableOpacity
            style={{
              width: 111,
              alignItems: 'center',
              backgroundColor: '#DB3169',
              borderRadius: 8,
              paddingVertical: 18,
            }}
            onPress={() => alert('Pressed!')}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 14,
              }}
            >
              {'All'}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: '#101623',
              fontSize: 14,
            }}
          >
            {'Routine'}
          </Text>
          <Text
            style={{
              color: '#101623',
              fontSize: 14,
            }}
          >
            {'Appointments'}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#F3E8ED',
            borderRadius: 8,
            borderWidth: 1,
            paddingVertical: 18,
            paddingHorizontal: 16,
            marginBottom: 25,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 27,
            }}
          >
            <View
              style={{
                flex: 1,
                marginRight: 4,
              }}
            >
              <Text
                style={{
                  color: '#101623',
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                {'Take Golden for a walk'}
              </Text>
              <Text
                style={{
                  color: '#ADADAD',
                  fontSize: 12,
                  marginLeft: 1,
                }}
              >
                {'Routine'}
              </Text>
            </View>
            <Image
              source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
              resizeMode={'stretch'}
              style={{
                width: 49,
                height: 49,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <Image
              source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
              resizeMode={'stretch'}
              style={{
                width: 16,
                height: 16,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                color: '#555555',
                fontSize: 12,
                marginRight: 23,
              }}
            >
              {'Everyday'}
            </Text>
            <Image
              source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
              resizeMode={'stretch'}
              style={{
                width: 16,
                height: 16,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                color: '#555555',
                fontSize: 12,
                marginRight: 30,
              }}
            >
              {'04:30 PM'}
            </Text>
            <Image
              source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
              resizeMode={'stretch'}
              style={{
                width: 6,
                height: 6,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                color: '#555555',
                fontSize: 12,
                flex: 1,
              }}
            >
              {'Mr. Golden'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                width: 155,
                alignItems: 'center',
                backgroundColor: '#F3E8ED',
                borderRadius: 8,
                paddingVertical: 18,
              }}
              onPress={() => alert('Pressed!')}
            >
              <Text
                style={{
                  color: '#555555',
                  fontSize: 14,
                }}
              >
                {'Cancel'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 155,
                alignItems: 'center',
                backgroundColor: '#DB3169',
                borderRadius: 8,
                paddingVertical: 18,
              }}
              onPress={() => alert('Pressed!')}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 14,
                }}
              >
                {'Reschedule'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#F3E8ED',
            borderRadius: 8,
            borderWidth: 1,
            paddingVertical: 18,
            paddingHorizontal: 16,
            marginBottom: 25,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 27,
            }}
          >
            <View
              style={{
                flex: 1,
                marginRight: 4,
              }}
            >
              <Text
                style={{
                  color: '#101623',
                  fontSize: 18,
                  marginBottom: 8,
                }}
              >
                {'Feed Bob'}
              </Text>
              <Text
                style={{
                  color: '#ADADAD',
                  fontSize: 12,
                }}
              >
                {'Routine'}
              </Text>
            </View>
            <Image
              source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
              resizeMode={'stretch'}
              style={{
                width: 49,
                height: 49,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <Image
              source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
              resizeMode={'stretch'}
              style={{
                width: 16,
                height: 16,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                color: '#555555',
                fontSize: 12,
                marginRight: 21,
              }}
            >
              {'Everyday'}
            </Text>
            <Image
              source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
              resizeMode={'stretch'}
              style={{
                width: 16,
                height: 16,
                marginRight: 5,
              }}
            />
            <Text
              style={{
                color: '#555555',
                fontSize: 12,
                marginRight: 26,
              }}
            >
              {'02:00 PM'}
            </Text>
            <Image
              source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
              resizeMode={'stretch'}
              style={{
                width: 6,
                height: 6,
                marginRight: 7,
              }}
            />
            <Text
              style={{
                color: '#555555',
                fontSize: 12,
                flex: 1,
              }}
            >
              {'Bob'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                width: 155,
                alignItems: 'center',
                backgroundColor: '#F3E8ED',
                borderRadius: 8,
                paddingVertical: 18,
              }}
              onPress={() => alert('Pressed!')}
            >
              <Text
                style={{
                  color: '#555555',
                  fontSize: 14,
                }}
              >
                {'Cancel'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 155,
                alignItems: 'center',
                backgroundColor: '#DB3169',
                borderRadius: 8,
                paddingVertical: 18,
              }}
              onPress={() => alert('Pressed!')}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 14,
                }}
              >
                {'Reschedule'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#F3E8ED',
              borderRadius: 8,
              borderWidth: 1,
              paddingVertical: 18,
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 27,
              }}
            >
              <View
                style={{
                  flex: 1,
                  marginRight: 4,
                }}
              >
                <Text
                  style={{
                    color: '#101623',
                    fontSize: 18,
                    marginBottom: 8,
                    marginHorizontal: 1,
                  }}
                >
                  {'Bob’s neutering'}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#ADADAD',
                      fontSize: 12,
                      marginRight: 33,
                    }}
                  >
                    {'Appointment'}
                  </Text>
                  <Image
                    source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
                    resizeMode={'stretch'}
                    style={{
                      width: 8,
                      height: 10,
                      marginRight: 4,
                    }}
                  />
                  <Text
                    style={{
                      color: '#ADADAD',
                      fontSize: 12,
                      flex: 1,
                    }}
                  >
                    {'BK Vet Clinic'}
                  </Text>
                </View>
              </View>
              <Image
                source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
                resizeMode={'stretch'}
                style={{
                  width: 49,
                  height: 49,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 15,
              }}
            >
              <Image
                source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
                resizeMode={'stretch'}
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 6,
                }}
              />
              <Text
                style={{
                  color: '#555555',
                  fontSize: 12,
                  marginRight: 21,
                }}
              >
                {'Tomorrow'}
              </Text>
              <Image
                source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
                resizeMode={'stretch'}
                style={{
                  width: 16,
                  height: 16,
                  marginRight: 6,
                }}
              />
              <Text
                style={{
                  color: '#555555',
                  fontSize: 12,
                  marginRight: 27,
                }}
              >
                {'6:00 PM'}
              </Text>
              <Image
                source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
                resizeMode={'stretch'}
                style={{
                  width: 6,
                  height: 6,
                  marginRight: 7,
                }}
              />
              <Text
                style={{
                  color: '#555555',
                  fontSize: 12,
                  flex: 1,
                }}
              >
                {'Bob'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  width: 155,
                  alignItems: 'center',
                  backgroundColor: '#F3E8ED',
                  borderRadius: 8,
                  paddingVertical: 18,
                }}
                onPress={() => alert('Pressed!')}
              >
                <Text
                  style={{
                    color: '#555555',
                    fontSize: 14,
                  }}
                >
                  {'Cancel'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 155,
                  alignItems: 'center',
                  backgroundColor: '#DB3169',
                  borderRadius: 8,
                  paddingVertical: 18,
                }}
                onPress={() => alert('Pressed!')}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 14,
                  }}
                >
                  {'Complete'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: -81,
              left: -35,
              width: 430,
              height: 89,
              backgroundColor: '#FFFFFF',
              paddingHorizontal: 59,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 28,
              }}
            >
              <Image
                source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
                resizeMode={'stretch'}
                style={{
                  width: 21,
                  height: 22,
                  marginRight: 47,
                }}
              />
              <Image
                source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
                resizeMode={'stretch'}
                style={{
                  width: 29,
                  height: 29,
                  marginRight: 42,
                }}
              />
              <Image
                source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
                resizeMode={'stretch'}
                style={{
                  width: 33,
                  height: 33,
                  marginRight: 50,
                }}
              />
              <Image
                source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
                resizeMode={'stretch'}
                style={{
                  width: 20,
                  height: 22,
                  marginRight: 49,
                }}
              />
              <Image
                source={{ uri: 'https://i.imgur.com/1tMFzp8.png' }}
                resizeMode={'stretch'}
                style={{
                  width: 16,
                  height: 20,
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ScheduleScreen
