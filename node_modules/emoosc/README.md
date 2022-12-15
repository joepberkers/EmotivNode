## OSC Sound Control Proxy For Emotiv



### Install

`$ npm install emoosc`
`$ cd emoosc`
`$ npm run -- config.yml`


### Arguments

Param | Desicription | Default
------|--------------|---------
- streams  | List of streams to publish | 'dev,eeg,pow,cog,mot,fac'
- username | | NA
- password | | NA
- port     | | 7777
- license  | | 

### OSC Routes

 Route | Frequency | Description 
 ------|-----------|------------
- `/emotiv/dev` | 2 Hz | Device Contact Quality Stream (2 Hz)
  - `/emotiv/dev/IEE_AF3` | | Contact Qualtity for AF3 Sensor
- `/emotiv/eeg` | | Raw EEG Values  
- `/emotiv/mot` | | Motion Sensors 
- `/emotiv/fac` | | Facial Expressions 
- `/emotiv/pow` | | Band Powers 
   - `/emotiv/pow/af3` | | Band Powers for af3  
     - `/emotiv/pow/af3/betaH`  | | High Beta for af3 sensor 
     - `/emotiv/pow/af3/betaL`  | | Low Beta for af3 sensor 
     - `/emotiv/pow/af3/theta`  | | Theta for af3 sensor 
     - `/emotiv/pow/af3/gamma`  | | Gamma for af3 sensor 
- `/emotiv/cog`  | | Cognitiv PErformance Metrics (0.1 Hz) 
   - `/emotiv/cog/fru` | | Frustration  
   - `/emotiv/cog/int` | | Interest  
   - `/emotiv/cog/val` | | Valence  
   - `/emotiv/cog/exc` | | Excitment  
   - `/emotiv/cog/eng` | | Engagement  
   - `/emotiv/cog/rel` | | Relaxation  
   - `/emotiv/cog/med` | | Medititation  


