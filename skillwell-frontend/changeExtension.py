import os

# Specify the folder path where your files are located
folder_path = 'D:\IIT Jodhpur\Second Year\semester 4\SOFTWARE ENGINEERING\lab\Skillwell\skillwell-frontend\src\contexts'

# List all files in the folder
file_list = os.listdir(folder_path)

# Iterate through each file in the folder
for filename in file_list:
    if filename.endswith('.js'):
        # Create the new filename by replacing .js with .jsx
        new_filename = os.path.splitext(filename)[0] + '.jsx'
        
        # Generate the full path of the file
        old_file_path = os.path.join(folder_path, filename)
        new_file_path = os.path.join(folder_path, new_filename)
        
        # Rename the file
        os.rename(old_file_path, new_file_path)
        print(f'Renamed: {filename} to {new_filename}')
        

